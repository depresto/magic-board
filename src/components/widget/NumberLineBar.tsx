import Konva from "konva";
import { WidgetElementProps } from "../../types/widget";
import { widgetActiveColor, widgetColor } from ".";
import WidgetElement from "./WidgetElement";

const defaultIntervalStart = 0;
const defaultIntervalEnd = 1;
const defaultBaseDominator = 4;
const defaultNumerator = 1;
const defaultDominator = 2;

const numberLineStartX = 0;
const numberLineWidth = 400;

const numberBarHeight = 20;
const numberBarGapWidth = 4;
const numberStartY = 0;

type NumberLineBarProps = WidgetElementProps & {
  intervalStart?: number;
  intervalEnd?: number;
  baseDominator?: number;
  numerator?: number;
  dominator?: number;
};
class NumberLineBar extends WidgetElement {
  constructor({
    intervalStart = defaultIntervalStart,
    intervalEnd = defaultIntervalEnd,
    baseDominator = defaultBaseDominator,
    numerator = defaultNumerator,
    dominator = defaultDominator,
    ...options
  }: NumberLineBarProps) {
    super(options);

    const numberBarObjects = new Konva.Group();
    const numberBarTotalGapCount = (intervalEnd - intervalStart) * dominator;
    const numberBarWidth = numberLineWidth / numberBarTotalGapCount;

    let counter = 0;
    for (
      let currentX = numberLineStartX;
      currentX < numberLineStartX + numberLineWidth;
      currentX += numberBarWidth
    ) {
      const rect = new Konva.Rect({
        fill: numerator <= counter ? widgetColor : widgetActiveColor,
        width: numberBarWidth - numberBarGapWidth,
        height: numberBarHeight,
        x: currentX + numberBarGapWidth / 2,
        y: numberStartY,
      });
      numberBarObjects.add(rect);
      counter += 1;
    }

    this.widgetGroup.add(numberBarObjects)
  }
}

export default NumberLineBar;
