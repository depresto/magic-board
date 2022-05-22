import Konva from "konva";

export type WidgetElementProps = {
  id?: string;
  isPreview?: boolean;
  canvas: Konva.Stage | null;
  initialX?: number;
  initialY?: number;
  initialAngle?: number;
};
export type WidgetType = "number-line" | "number-line-bar";
export type WidgetProps = { [key: string]: number };
export type WidgetDraggableProps = {
  widgetType: WidgetType;
  widgetProps: WidgetProps;
};
export type CanvasWidgetProps = {
  id: string;
  x: number;
  y: number;
  angle: number;
  type: WidgetType;
  props: { [key: string]: number };
};
