export type WidgetType = "number-line-tool";
export type WidgetProps = { [key: string]: number };
export type WidgetDraggableProps = {
  widgetType: WidgetType;
  widgetProps: WidgetProps;
};
