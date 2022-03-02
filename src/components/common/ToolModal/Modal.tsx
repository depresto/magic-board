import React from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import ModalHeader from "./Header";
import { ModalProvider, useModelContext } from "./ModalContext";

const StyledModalDiv = styled.div`
  background: #e5e5e5;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  width: 100%;
  height: 100%;

  .modal-container {
    position: relative;
  }
`;

export type ModalProps = {
  title?: string;
};

const ModalRoot: React.FC<ModalProps> = ({ title, children }) => {
  const { setModalRef } = useModelContext();

  return (
    <Rnd
      dragHandleClassName="draggable-handle"
      bounds=".layout-content"
      default={{ x: 10, y: 10, width: 500, height: 300 }}
      minWidth={400}
      minHeight={250}
    >
      <StyledModalDiv ref={setModalRef}>
        <div className="modal-container">
          <ModalHeader>{title}</ModalHeader>
          <div className="modal-body">{children}</div>
        </div>
      </StyledModalDiv>
    </Rnd>
  );
};

const Modal: React.FC<ModalProps> = ({ ...props }) => {
  return (
    <ModalProvider>
      <ModalRoot {...props} />
    </ModalProvider>
  );
};

export default Modal;
