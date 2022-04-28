import React, { createContext, useContext, useEffect, useState } from "react";
import { CanvasWidgetProps } from "../types/widget";

export type ToolboxProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  minimize?: boolean;
};
type ToolboxToolboxesProps = {
  [widgetType: string]: ToolboxProps;
};
type ToolboxContextProps = {
  toolboxes: ToolboxToolboxesProps;
  canvasWidgets: CanvasWidgetProps[];
  setToolbox?: (toolboxType: string, toolboxProps: ToolboxProps) => void;
  showToolbox?: (toolboxType: string) => void;
  minimizeToolbox?: (toolboxType: string) => void;
  closeToolbox?: (toolboxType: string) => void;
  setCanvasWidget?: (canvasWidget: CanvasWidgetProps) => void;
  setCanvasWidgetById?: (
    id: string,
    canvasWidget: Partial<CanvasWidgetProps>
  ) => void;
  removeCanvasWidgets?: (ids: string[]) => void;
};
const initialToolboxContextProps = {
  toolboxes: {},
  canvasWidgets: [],
};
const ToolboxContext = createContext<ToolboxContextProps>(
  initialToolboxContextProps
);

export const useToolbox = () => useContext(ToolboxContext);

export const ToolboxProvider: React.FC = ({ children }) => {
  const [toolboxes, setToolboxes] = useState<ToolboxToolboxesProps>({});
  const [canvasWidgets, setCanvasWidgets] = useState<CanvasWidgetProps[]>([]);

  useEffect(() => {
    try {
      const toolboxData = localStorage.getItem("data.toolboxes");
      if (toolboxData) {
        setToolboxes(JSON.parse(toolboxData));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("data.toolboxes", JSON.stringify(toolboxes));
    } catch {}
  }, [toolboxes]);

  const setToolbox = (toolboxType: string, toolboxProps: ToolboxProps) => {
    setToolboxes((toolboxes) => {
      const newToolboxes = { ...toolboxes };
      newToolboxes[toolboxType] = {
        ...newToolboxes[toolboxType],
        ...toolboxProps,
      };
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

  const setCanvasWidget = (canvasWidget: CanvasWidgetProps) => {
    setCanvasWidgets((canvasWidgets) => {
      return [...canvasWidgets, canvasWidget];
    });
  };

  const setCanvasWidgetById = (
    id: string,
    canvasWidget: Partial<CanvasWidgetProps>
  ) => {
    setCanvasWidgets((canvasWidgets) => {
      const newCanvasWidgets = [...canvasWidgets];
      const index = newCanvasWidgets.findIndex((widget) => widget.id === id);
      newCanvasWidgets[index] = { ...newCanvasWidgets[index], ...canvasWidget };
      return newCanvasWidgets;
    });
  };

  const removeCanvasWidgets = (ids: string[]) => {
    setCanvasWidgets((canvasWidgets) => {
      return canvasWidgets.filter((widget) => !ids.includes(widget.id));
    });
  };

  useEffect(() => {
    try {
      const widgetsData = localStorage.getItem("data.widgets");
      if (widgetsData) {
        setCanvasWidgets(JSON.parse(widgetsData));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("data.widgets", JSON.stringify(canvasWidgets));
    } catch {}
  }, [canvasWidgets]);

  return (
    <ToolboxContext.Provider
      value={{
        toolboxes,
        canvasWidgets,
        setToolbox,
        showToolbox,
        minimizeToolbox,
        closeToolbox,
        setCanvasWidget,
        setCanvasWidgetById,
        removeCanvasWidgets,
      }}
    >
      {children}
    </ToolboxContext.Provider>
  );
};
