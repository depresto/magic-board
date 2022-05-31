import Konva from "konva";
import { widgetActiveColor } from ".";
import { WidgetElementProps } from "../../types/widget";
import WidgetElement from "./WidgetElement";

const defaultNumerator = 1;
const defaultDominator = 2;
const circleRadius = 80;

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

    const fractionGroup = new Konva.Group({
      x:
        numerator / dominator === 1
          ? (circleRadius / 4) * 3
          : (circleRadius / 4) * 5,
      y:
        numerator / dominator === 1
          ? (circleRadius / 8) * 5
          : circleRadius / 2 + 5,
    });
    fractionGroup.add(
      new Konva.Text({
        text: numerator.toString(),
        fontSize,
        fontFamily,
        align: "center",
        width: 40,
      })
    );
    fractionGroup.add(
      new Konva.Line({
        points: [0, 0, 40, 0],
        stroke: "black",
        strokeWidth: 1,
        y: 32,
      })
    );
    fractionGroup.add(
      new Konva.Text({
        text: dominator.toString(),
        fontSize,
        fontFamily,
        align: "center",
        width: 40,
        y: 40,
      })
    );

    const wedge = new Konva.Wedge({
      fill: widgetActiveColor,
      x: circleRadius,
      y: circleRadius,
      radius: circleRadius,
      angle: circleAngle,
      rotation: -circleAngle / 2,
    });

    this.widgetGroup.add(wedge);
    this.widgetGroup.add(fractionGroup);
  }
}

export default CircleElement;
