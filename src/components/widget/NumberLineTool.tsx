import React, { useEffect } from "react";
import styled from "styled-components";
import { fabric } from "fabric";

const StyledNumberLineTool = styled.div``;

type NumberLineToolProps = {
  isPreview?: boolean;
  canvas: fabric.Canvas | null;
  intervalStart: number;
  intervalEnd: number;
  baseDominator: number;
  numerator: number;
  dominator: number;
};
const NumberLineTool: React.FC<NumberLineToolProps> = ({
  isPreview,
  canvas,
  intervalStart,
  intervalEnd,
  baseDominator,
  numerator,
  dominator,
}) => {
  useEffect(() => {
    let lineGroup: fabric.Group;

    const startX = 40;
    const startY = 40;
    const numberLineWidth = 400;
    const numberLineHeight = 36;
    const numberLineGapHeight = 20;

    const totalGapCount = (intervalEnd - intervalStart) * baseDominator;
    const lineGapWidth = numberLineWidth / totalGapCount;
    const numberLineHeightGap = (numberLineHeight - numberLineGapHeight) / 2;

    if (canvas) {
      // const circle = new fabric.Circle({
      //   radius: 20,
      //   fill: "green",
      //   left: 100,
      //   top: 100,
      // });
      // circle.cornerSize = 6;

      const lineGroupObjects: fabric.Object[] = [];
      const baseLine = new fabric.Line([0, 0, numberLineWidth, 0], {
        stroke: "black",
        fill: "black",
        strokeWidth: 2,
        strokeLineCap: "round",
        left: startX,
        top: startY + numberLineHeight / 2,
      });
      lineGroupObjects.push(baseLine);

      let counter = 0;
      for (
        let currentX = startX;
        currentX <= startX + numberLineWidth + lineGapWidth / 2;
        currentX += lineGapWidth
      ) {
        const isCurrentInteger = counter % baseDominator === 0;
        const line = new fabric.Line(
          [
            currentX,
            isCurrentInteger ? 0 : numberLineHeightGap,
            currentX,
            isCurrentInteger
              ? numberLineHeight
              : numberLineHeight - numberLineHeightGap,
          ],
          {
            stroke: "black",
            fill: "black",
            strokeWidth: 2,
            strokeLineCap: "round",
            left: currentX,
            top: isCurrentInteger ? startY : startY + numberLineHeightGap,
          }
        );
        lineGroupObjects.push(line);
        counter += 1;
      }

      counter = 0;
      for (
        let IntegerCounter = intervalStart;
        IntegerCounter <= intervalEnd;
        IntegerCounter += 1
      ) {
        const line = new fabric.Text(counter.toString(), {
          fontSize: 28,
          fontFamily: "san-serif",
          left: startX + counter * lineGapWidth * baseDominator - 8,
          top: startY + numberLineHeight + 6,
        });
        lineGroupObjects.push(line);
        counter += 1;
      }

      lineGroup = new fabric.Group(lineGroupObjects);
      // canvas.add(circle);
      canvas.add(lineGroup);
      canvas.selection = true;
      canvas.targetFindTolerance = 4;
      canvas.perPixelTargetFind = true;
    }

    return () => {
      if (lineGroup) {
        canvas?.remove(lineGroup);
      }
    };
  }, [baseDominator, canvas, intervalEnd, intervalStart]);

  return <StyledNumberLineTool></StyledNumberLineTool>;
};

export default NumberLineTool;
