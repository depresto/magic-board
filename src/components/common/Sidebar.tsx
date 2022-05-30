import React from "react";
import styled from "styled-components";
import { ReactComponent as ComponentCircleSvg } from "../../assets/images/sidebar/component-circle.svg";
import { ReactComponent as ComponentSquareSvg } from "../../assets/images/sidebar/component-square.svg";
import { ReactComponent as ComponentLineSvg } from "../../assets/images/sidebar/component-line.svg";
import { useToolbox } from "../../context/ToolboxContext";
import { ToolboxType } from "../../types/toolbox";

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
`;
const StyledModalButton = styled.button<{ $active?: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  svg {
    border-radius: 10px;
    transition: background 0.5s ease-in-out;
    background: ${(props) =>
      props.$active ? "rgba(255, 255, 255, 0.8)" : "transparent"};
  }
  &:hover {
    svg {
      background: rgba(255, 255, 255, 0.6);
    }
  }
`;

const Sidebar: React.FC = () => {
  const { toolboxes, setToolbox } = useToolbox();

  const onClickToolbox = (toolboxType: ToolboxType) => {
    if (toolboxes[toolboxType]) {
      const toolboxProps = toolboxes[toolboxType];
      toolboxProps.minimize = false;
      setToolbox?.(toolboxType, toolboxProps);
    } else {
      setToolbox?.(toolboxType, { minimize: false });
    }
  };

  return (
    <StyledSidebar className="d-flex flex-column">
      <div className="title-box d-flex justify-content-center align-items-center">
        模型區
      </div>

      <div className="model-container d-flex flex-column justify-content-center">
        <StyledModalButton
          className="my-4 py-1"
          $active={Boolean(toolboxes["circle"])}
          onClick={() => onClickToolbox("circle-tool")}
        >
          <ComponentCircleSvg />
        </StyledModalButton>

        <StyledModalButton
          className="my-4 py-1"
          $active={Boolean(toolboxes["square"])}
          onClick={() => onClickToolbox("square-tool")}
        >
          <ComponentSquareSvg />
        </StyledModalButton>

        <StyledModalButton
          className="my-4 py-1"
          $active={Boolean(toolboxes["number-line-tool"])}
          onClick={() => onClickToolbox("number-line-tool")}
        >
          <ComponentLineSvg />
        </StyledModalButton>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
