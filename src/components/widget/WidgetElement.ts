import * as PIXI from "pixi.js";

export type WidgetElementProps = {
  id?: string;
  isPreview?: boolean;
  initialX?: number;
  initialY?: number;
  initialAngle?: number;
};

class WidgetElement extends PIXI.Container {
  id?: string;
  isPreview?: boolean;
  initialX?: number;
  initialY?: number;
  initialAngle?: number;

  alpha = 1;
  dragging = false;
  active = false;
  data: PIXI.InteractionData | null = null;

  dragPointerStart: PIXI.IPointData | null = null;
  dragObjStart: PIXI.Point | null = null;
  dragGlobalStart: PIXI.Point | null = null;

  constructor(option: WidgetElementProps) {
    super();
    this.id = option.id;
    this.isPreview = option.isPreview;
    this.initialX = option.initialX;
    this.initialY = option.initialY;
    this.initialAngle = option.initialAngle;

    this.buttonMode = true;
    this.interactive = true;

    if (this.initialX && this.initialY) {
      this.position.set(this.initialX, this.initialY);
    }

    this.on("mousedown", this.onDragStart);
    this.on("touchstart", this.onDragStart);
    this.on("mouseup", this.onDragEnd);
    this.on("mouseupoutside", this.onDragEnd);
    this.on("touchend", this.onDragEnd);
    this.on("touchendoutside", this.onDragEnd);
    this.on("mousemove", this.onDragMove);
    this.on("touchmove", this.onDragMove);
  }

  toImageUrl() {
    const app = new PIXI.Application({ backgroundAlpha: 0 });
    app.stage.addChild(this);
    return app.renderer.plugins.extract
      .image(app.stage, "image/png", 1)
      .getAttribute("src");
  }

  onDragStart(event: PIXI.InteractionEvent) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
    this.active = true;

    this.dragPointerStart = event.data.getLocalPosition(this.parent);

    this.dragObjStart = new PIXI.Point();
    this.dragObjStart.copyFrom(this.position);

    this.dragGlobalStart = new PIXI.Point();
    this.dragGlobalStart.copyFrom(event.data.global);
  }

  onDragEnd(event: PIXI.InteractionEvent) {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
  }

  onDragMove() {
    if (
      !this.dragging ||
      !this.data ||
      !this.dragObjStart ||
      !this.dragPointerStart
    ) {
      return;
    }

    const newPosition = this.data.getLocalPosition(this.parent);
    this.position.x =
      this.dragObjStart.x + (newPosition.x - this.dragPointerStart.x);
    this.position.y =
      this.dragObjStart.y + (newPosition.y - this.dragPointerStart.y);
  }

  onInactive() {
    this.active = false;
  }
}

export default WidgetElement;
