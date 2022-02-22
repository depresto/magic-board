import React from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import Portal from "../Portal";
import ModalHeader from "./Header";
import { ModalProvider, useModelContext } from "./ModalContext";
import { useAppSizing } from "../../../context/AppSizingContext";

const StyledModalDiv = styled.div`
  position: fixed;
  left: 100;
  top: 0;

  background: #e5e5e5;
  border: 1px solid #e5e5e5;
  border-radius: 5px;

  .modal-container {
    position: relative;
  }
`;

export type ModalProps = {
  title?: string;
};

const ModalRoot: React.FC<ModalProps> = ({ title }) => {
  const { modelRef, setModalRef, modalWidth, modalHeight } = useModelContext();
  const { contentBounding } = useAppSizing();

  return (
    <Draggable
      handle=".draggable-handle"
      bounds={{
        left: contentBounding?.left,
        top: contentBounding?.top,
        right:
          contentBounding && modelRef
            ? contentBounding.right - modelRef.clientWidth
            : undefined,
        bottom:
          contentBounding && modelRef
            ? contentBounding.bottom - modelRef.clientHeight
            : undefined,
      }}
      defaultPosition={{ x: 120, y: 10 }}
    >
      <StyledModalDiv
        ref={setModalRef}
        style={{
          width: modalWidth,
          height: modalHeight,
        }}
      >
        <div className="modal-container">
          <ModalHeader>{title}</ModalHeader>
        </div>
      </StyledModalDiv>
    </Draggable>
  );
};

const Modal: React.FC<ModalProps> = ({ ...props }) => {
  return (
    <Portal>
      <ModalProvider>
        <ModalRoot {...props} />
      </ModalProvider>
    </Portal>
  );
};

export default Modal;
