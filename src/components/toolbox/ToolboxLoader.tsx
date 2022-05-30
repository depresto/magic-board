import React from "react";
import { useToolbox } from "../../context/ToolboxContext";
import { ToolboxType } from "../../types/toolbox";
import NumberLineToolModal from "./NumberLineToolModal";
import SquareToolModal from "./SquareToolModal";
import CircleToolModal from "./CircleToolModal";

const ToolboxLoader: React.FC = () => {
  const { toolboxes } = useToolbox();

  return (
    <>
      {Object.keys(toolboxes).map((toolboxType, index) => {
        const toolboxProps = toolboxes[toolboxType];
        if (toolboxProps.minimize) {
          return null;
        }

        switch (toolboxType as ToolboxType) {
          case "number-line-tool":
            return <NumberLineToolModal key={index} />;
          case "square-tool":
            return <SquareToolModal key={index} />;
          case "circle-tool":
            return <CircleToolModal key={index} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default ToolboxLoader;
