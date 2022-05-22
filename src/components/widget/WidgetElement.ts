import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";

export type WidgetElementProps = {
  id?: string;
  isPreview?: boolean;
  initialX?: number;
  initialY?: number;
  initialAngle?: number;
};

class WidgetElement {
  id?: string;
  isPreview?: boolean;
  initialAngle?: number;

  widgetLayer: Konva.Layer;

  alpha = 1;
  dragging = false;
  active = false;

  constructor(option: WidgetElementProps) {
    this.id = option.id;
    this.isPreview = option.isPreview;
    this.initialAngle = option.initialAngle;
    this.widgetLayer = new Konva.Layer({ draggable: true });

    if (option.initialX && option.initialY) {
      this.widgetLayer.setPosition({
        x: option.initialX,
        y: option.initialY,
      });
    }
  }

  toImageUrl() {
    return this.widgetLayer.toDataURL({});
  }

  onInactive() {
    this.active = false;
  }
}

export default WidgetElement;
