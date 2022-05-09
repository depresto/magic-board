import * as PIXI from "pixi.js";
import { widgetColorHex } from ".";
import WidgetElement, { WidgetElementProps } from "./WidgetElement";

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
  intervalStart: number;
  intervalEnd: number;
  baseDominator: number;
  numerator: number;
  dominator: number;

  constructor(options: NumberLineBarProps) {
    super(options);
    this.intervalStart = options.intervalStart ?? defaultIntervalStart;
    this.intervalEnd = options.intervalStart ?? defaultIntervalEnd;
    this.baseDominator = options.baseDominator ?? defaultBaseDominator;
    this.numerator = options.numerator ?? defaultNumerator;
    this.dominator = options.dominator ?? defaultDominator;

    const numberBarTotalGapCount =
      (this.intervalEnd - this.intervalStart) * this.dominator;
    const numberBarWidth = numberLineWidth / numberBarTotalGapCount;

    let counter = 0;
    for (
      let currentX = numberLineStartX;
      currentX < numberLineStartX + numberLineWidth;
      currentX += numberBarWidth
    ) {
      const rect = new PIXI.Graphics();
      rect.beginFill(widgetColorHex);
      rect.alpha = this.numerator <= counter ? 0.8 : 0.2;
      rect.drawRect(
        currentX + numberBarGapWidth / 2,
        numberStartY,
        numberBarWidth - numberBarGapWidth,
        numberBarHeight
      );
      this.addChild(rect);
      counter += 1;
    }
  }
}

export default NumberLineBar;
