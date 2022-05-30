import React from "react";
import styled from "styled-components";
import { ReactComponent as MenuIconSvg } from "../../assets/images/icon/menu.svg";
import { ToolboxProps, useToolbox } from "../../context/ToolboxContext";
import { ToolboxType } from "../../types/toolbox";

const StyledToolbar = styled.div`
  height: var(--toolbar-height);
  width: 100%;
  background-color: var(--toolbar-background);
`;

type StyledMenuButtonProps = {
  $type?: "default" | "toolbox";
  $active?: boolean;
};
const StyledMenuButton = styled.div<StyledMenuButtonProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.$type === "toolbox"
      ? props.$active
        ? "rgba(255,255,255, 0.8)"
        : "rgba(255,255,255, 0.6)"
      : "var(--secondary-color)"};
  border-radius: 10px;
  user-select: none;
  cursor: pointer;

  .text-tag {
    width: 100px;
    text-align: center;
  }
`;
const MenuButton: React.FC = () => {
  return (
    <StyledMenuButton className="py-2 px-2">
      <MenuIconSvg />
      <span className="text-tag">分數</span>
    </StyledMenuButton>
  );
};

const toolbarNameMapping = {
  "number-line-tool": "數線工具",
  "square-tool": "方形元件",
  "circle-tool": "圓形元件",
};

const Toolbar: React.FC = () => {
  const { toolboxes, showToolbox, minimizeToolbox } = useToolbox();

  const onSwitchToolbox = (
    toolboxType: ToolboxType,
    currentToolboxProps: ToolboxProps | undefined
  ) => {
    if (currentToolboxProps?.minimize) {
      showToolbox?.(toolboxType);
    } else {
      minimizeToolbox?.(toolboxType);
    }
  };

  return (
    <StyledToolbar className="d-flex px-3 py-3">
      <div className="mr-4">
        <MenuButton />
      </div>

      <div className="d-flex">
        {Object.keys(toolboxes).map((toolboxType, index) => {
          const type = toolboxType as ToolboxType;
          const toolboxProps = toolboxes[toolboxType];
          const toolboxName = toolbarNameMapping[type];

          if (toolboxName) {
            return (
              <StyledMenuButton
                key={index}
                className="py-2 px-4 mr-4"
                $type="toolbox"
                $active={!toolboxProps.minimize}
                onClick={() => onSwitchToolbox(type, toolboxProps)}
              >
                <span className="text-tag">{toolboxName}</span>
              </StyledMenuButton>
            );
          } else {
            return null;
          }
        })}
      </div>
    </StyledToolbar>
  );
};

export default Toolbar;
