import Konva from "konva";
import { widgetActiveColor } from ".";
import { WidgetElementProps } from "../../types/widget";
import WidgetElement from "./WidgetElement";

const defaultNumerator = 1;
const defaultDominator = 2;

const circleRadius = 80;
const numberLineWidth = 400;
const circleStartX = 0;
const circleStartY = 0;

const lineStrokeColor = "black";
const lineStrokeLinCap = "round";
const lineStrokeWidth = 2;
const arrowStrokeWidth = 3;
const fontSize = 28;
const fontFamily = "san-serif";

type CircleElementProps = WidgetElementProps & {
  numerator?: number;
  dominator?: number;
};
class CircleElement extends WidgetElement {
  constructor({
    numerator = defaultNumerator,
    dominator = defaultDominator,
    ...options
  }: CircleElementProps) {
    super(options);

    const circleAngle = (numerator / dominator) * 360;

    const wedge = new Konva.Wedge({
      fill: widgetActiveColor,
      x: circleRadius,
      y: circleRadius,
      radius: circleRadius,
      angle: circleAngle,
      rotation: -circleAngle / 2,
    });

    this.widgetGroup.add(wedge);
  }
}

export default CircleElement;
