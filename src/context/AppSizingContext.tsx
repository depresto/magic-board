import React, { createContext, useContext, useEffect, useState } from "react";

type AppSizingContextProps = {
  contentBounding: DOMRect | null;
  contentRef: Element | null;
  setContentBounding?: React.Dispatch<React.SetStateAction<DOMRect | null>>;
  setContentRef?: React.Dispatch<React.SetStateAction<Element | null>>;
};
const initialModalContextProps = {
  contentBounding: null,
  contentRef: null,
};
const AppSizingContext = createContext<AppSizingContextProps>(
  initialModalContextProps
);

export const useAppSizing = () => useContext(AppSizingContext);

export const AppSizingProvider: React.FC = ({ children }) => {
  const [contentBounding, setContentBounding] = useState<DOMRect | null>(null);
  const [contentRef, setContentRef] = useState<Element | null>(null);

  useEffect(() => {
    const onResize = () => {
      if (contentRef) {
        const bounding = contentRef.getBoundingClientRect();
        setContentBounding(bounding);
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [contentRef, setContentBounding]);

  return (
    <AppSizingContext.Provider
      value={{
        contentBounding,
        contentRef,
        setContentBounding,
        setContentRef,
      }}
    >
      {children}
    </AppSizingContext.Provider>
  );
};
