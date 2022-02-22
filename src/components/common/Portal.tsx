import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export const usePortal = () => {
  const rootNodeRef = React.useRef<Node | null>(null);

  useEffect(() => {
    if (!rootNodeRef.current) {
      rootNodeRef.current = document.createElement("div");
      document.body.appendChild(rootNodeRef.current);
    }

    return () => {
      if (rootNodeRef.current) {
        rootNodeRef.current.parentNode?.removeChild(rootNodeRef.current);
        rootNodeRef.current = null;
      }
    };
  }, []);

  const getRoot = () => {
    if (!rootNodeRef.current) {
      rootNodeRef.current = document.createElement("div");
      document.body.appendChild(rootNodeRef.current);
    }
    return rootNodeRef.current as Element;
  };

  return getRoot();
};

const Portal: React.FC = ({ children }) => {
  const target = usePortal();
  return createPortal(children, target);
};

export default Portal;
