import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize, faXmark } from "@fortawesome/free-solid-svg-icons";

const StyledModalHeader = styled.div`
  width: 100%;
  height: 30px;
  background: #c4c4c4;
  border-radius: 5px 5px 0px 0px;
  cursor: pointer;

  .modal-header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 10px;
    font-size: 16px;
    font-weight: 500;
  }
  .modal-header-title {
    padding-left: 10px;
  }
  .modal-header-operation {
    display: flex;
  }
  .modal-header-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    font-size: 12px;
    border-radius: 50%;
    margin-left: 4px;
    cursor: pointer;
    font-weight: 300;
    &__minimize {
      background: #ffeeb3;
    }
    &__close {
      background: #fd423d;
    }
  }
`;

const ModalHeader: React.FC<{
  onMinimize?: () => void;
  onClose?: () => void;
}> = ({ onMinimize, onClose, children }) => {
  const onButtonMouseEvent: React.MouseEventHandler<HTMLDivElement> = (event) =>
    event.stopPropagation();

  return (
    <StyledModalHeader className="draggable-handle">
      <div className="modal-header-wrapper">
        <div className="modal-header-title">{children}</div>
        <div className="modal-header-operation">
          <div
            className="modal-header-btn modal-header-btn__minimize"
            onClick={onMinimize}
            onMouseDown={onButtonMouseEvent}
            onMouseUp={onButtonMouseEvent}
            onMouseMove={onButtonMouseEvent}
          >
            <FontAwesomeIcon icon={faWindowMinimize} />
          </div>

          <div
            className="modal-header-btn modal-header-btn__close"
            onClick={onClose}
            onMouseDown={onButtonMouseEvent}
            onMouseUp={onButtonMouseEvent}
            onMouseMove={onButtonMouseEvent}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
      </div>
    </StyledModalHeader>
  );
};

export default ModalHeader;
