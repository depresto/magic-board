import React from "react";
import styled from "styled-components";
import { ReactComponent as ComponentCircleSvg } from "../../assets/images/sidebar/component-circle.svg";
import { ReactComponent as ComponentSquareSvg } from "../../assets/images/sidebar/component-square.svg";
import { ReactComponent as ComponentLineSvg } from "../../assets/images/sidebar/component-line.svg";

const StyledSidebar = styled.div`
  width: 100px;
  height: 100%;
  background-color: var(--toolbar-background);

  .title-box {
    width: 100%;
    height: 60px;
    background-color: var(--secondary-color);
    color: white;
  }
  .model-container {
    flex: 1;
  }
  .model-button {
    background: transparent;
    border: none;
    cursor: pointer;
    svg {
      border-radius: 10px;
      transition: background 0.5s ease-in-out;
    }
    &:hover svg {
      background: rgba(255, 255, 255, 0.6);
    }
  }
`;

const Sidebar: React.FC = () => {
  return (
    <StyledSidebar className="d-flex flex-column">
      <div className="title-box d-flex justify-content-center align-items-center">
        模型區
      </div>

      <div className="model-container d-flex flex-column justify-content-center">
        <button className="my-4 py-1 model-button">
          <ComponentCircleSvg />
        </button>
        <button className="my-4 py-1 model-button">
          <ComponentSquareSvg />
        </button>
        <button className="my-4 py-1 model-button">
          <ComponentLineSvg />
        </button>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
