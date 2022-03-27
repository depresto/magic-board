import React, { createContext, useContext, useState } from "react";

export type ToolboxProps = { x?: number; y?: number; minimize?: boolean };
type ToolboxToolboxesProps = {
  [widgetType: string]: ToolboxProps;
};
type ToolboxContextProps = {
  toolboxes: ToolboxToolboxesProps;
  setToolbox?: (toolboxType: string, toolboxProps: ToolboxProps) => void;
  showToolbox?: (toolboxType: string) => void;
  minimizeToolbox?: (toolboxType: string) => void;
  closeToolbox?: (toolboxType: string) => void;
};
const initialToolboxContextProps = {
  toolboxes: {},
};
const ToolboxContext = createContext<ToolboxContextProps>(
  initialToolboxContextProps
);

export const useToolbox = () => useContext(ToolboxContext);

export const ToolboxProvider: React.FC = ({ children }) => {
  const [toolboxes, setToolboxes] = useState<ToolboxToolboxesProps>({});

  const setToolbox = (toolboxType: string, toolboxProps: ToolboxProps) => {
    setToolboxes((toolboxes) => {
      const newToolboxes = { ...toolboxes };
      newToolboxes[toolboxType] = toolboxProps;
      return newToolboxes;
    });
  };

  const showToolbox = (toolboxType: string) => {
    setToolboxes((toolboxes) => {
      const newToolboxes = { ...toolboxes };
      newToolboxes[toolboxType] = { ...newToolboxes[toolboxType] };
      newToolboxes[toolboxType].minimize = false;
      return newToolboxes;
    });
  };

  const minimizeToolbox = (toolboxType: string) => {
    setToolboxes((toolboxes) => {
      const newToolboxes = { ...toolboxes };
      newToolboxes[toolboxType] = { ...newToolboxes[toolboxType] };
      newToolboxes[toolboxType].minimize = true;
      return newToolboxes;
    });
  };

  const closeToolbox = (toolboxType: string) => {
    setToolboxes((toolboxes) => {
      const newToolboxes = { ...toolboxes };
      delete newToolboxes[toolboxType];
      return newToolboxes;
    });
  };

  return (
    <ToolboxContext.Provider
      value={{
        toolboxes,
        setToolbox,
        showToolbox,
        minimizeToolbox,
        closeToolbox,
      }}
    >
      {children}
    </ToolboxContext.Provider>
  );
};
