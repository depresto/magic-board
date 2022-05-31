import Konva from "konva";
import { widgetActiveColor } from ".";
import { WidgetElementProps } from "../../types/widget";
import WidgetElement from "./WidgetElement";

const defaultNumerator = 1;
const defaultDominator = 2;
const squareWidth = 200;
const squareHeight = 100;

const fontSize = 40;
const fontFamily = "san-serif";
const fractionWidth = 56;

type SquareElementProps = WidgetElementProps & {
  numerator?: number;
  dominator?: number;
};
class SquareElement extends WidgetElement {
  constructor({
    numerator = defaultNumerator,
    dominator = defaultDominator,
    ...options
  }: SquareElementProps) {
    super(options);

    const widgetWidget = squareWidth * (numerator / dominator);
    const fractionGroup = new Konva.Group({
      x:
        widgetWidget > fractionWidth ? widgetWidget / 2 - fractionWidth / 2 : 0,
    });
    fractionGroup.add(
      new Konva.Rect({
        width: fractionWidth,
        height: squareHeight,
        x: 20,
        y: 0,
      })
    );
    fractionGroup.add(
      new Konva.Text({
        text: numerator.toString(),
        fontSize,
        fontFamily,
        align: "center",
        width: fractionWidth,
      })
    );
    fractionGroup.add(
      new Konva.Line({
        points: [0, 0, fractionWidth, 0],
        stroke: "black",
        strokeWidth: 2,
        y: fractionWidth - 10,
      })
    );
    fractionGroup.add(
      new Konva.Text({
        text: dominator.toString(),
        fontSize,
        fontFamily,
        align: "center",
        width: fractionWidth,
        y: fractionWidth,
      })
    );

    const rect = new Konva.Rect({
      fill: widgetActiveColor,
      width: widgetWidget,
      height: squareHeight,
    });

    this.widgetGroup.add(rect);
    this.widgetGroup.add(fractionGroup);
  }
}

export default SquareElement;
