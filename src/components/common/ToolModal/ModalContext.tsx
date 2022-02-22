import React, { createContext, useContext, useState } from "react";

type ModalContextProps = {
  modelRef: Element | null;
  modalWidth: number;
  modalHeight: number;
  setModalRef?: React.Dispatch<React.SetStateAction<Element | null>>;
  setModalWidth?: React.Dispatch<React.SetStateAction<number>>;
  setModalHeight?: React.Dispatch<React.SetStateAction<number>>;
};
const initialModalContextProps: ModalContextProps = {
  modelRef: null,
  modalWidth: 500,
  modalHeight: 300,
};
const ModalContext = createContext<ModalContextProps>(initialModalContextProps);

export const useModelContext = () => useContext(ModalContext);

export const ModalProvider: React.FC = ({ children }) => {
  const [modelRef, setModalRef] = useState<Element | null>(null);
  const [modalWidth, setModalWidth] = useState(
    initialModalContextProps.modalWidth
  );
  const [modalHeight, setModalHeight] = useState(
    initialModalContextProps.modalHeight
  );

  return (
    <ModalContext.Provider
      value={{
        ...initialModalContextProps,
        modelRef,
        modalWidth,
        modalHeight,
        setModalRef,
        setModalWidth,
        setModalHeight,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
