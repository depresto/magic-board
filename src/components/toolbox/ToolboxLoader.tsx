import React from "react";
import { useToolbox } from "../../context/ToolboxContext";
import { WidgetType } from "../../types/widget";
import NumberLineToolModal from "./NumberLineToolModal";

const ToolboxLoader: React.FC = () => {
  const { toolboxes } = useToolbox();

  return (
    <>
      {Object.keys(toolboxes).map((toolboxType, index) => {
        const toolboxProps = toolboxes[toolboxType];
        if (toolboxProps.minimize) {
          return null;
        }

        switch (toolboxType as WidgetType) {
          case "number-line-tool":
            return <NumberLineToolModal key={index} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default ToolboxLoader;
