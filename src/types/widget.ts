export type WidgetType = "number-line-tool";
export type WidgetProps = { [key: string]: number };
export type WidgetDraggableProps = {
  widgetType: WidgetType;
  widgetProps: WidgetProps;
};
export type CanvasWidgetProps = {
  id: string
  x: number;
  y: number;
  angle: number;
  type: WidgetType;
  props: { [key: string]: number };
};
