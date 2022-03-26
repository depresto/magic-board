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
    const lineWidth = 400;
    const lineHeight = 30;

    const lineGapWidth = lineWidth / baseDominator;

    console.log(baseDominator);

    if (canvas) {
      // const circle = new fabric.Circle({
      //   radius: 20,
      //   fill: "green",
      //   left: 100,
      //   top: 100,
      // });
      // circle.cornerSize = 6;

      const lineGroupObjects: fabric.Object[] = [];
      const baseLine = new fabric.Line([0, 0, lineWidth, 0], {
        stroke: "black",
        fill: "black",
        strokeWidth: 2,
        strokeLineCap: "round",
        left: startX,
        top: startY + lineHeight / 2,
      });
      lineGroupObjects.push(baseLine);
      for (
        let currentX = startX;
        currentX <= startX + lineWidth + lineGapWidth / 2;
        currentX += lineGapWidth
      ) {
        const line = new fabric.Line([currentX, 0, currentX, lineHeight], {
          stroke: "black",
          fill: "black",
          strokeWidth: 2,
          strokeLineCap: "round",
          left: currentX,
          top: startY,
        });
        lineGroupObjects.push(line);
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
  }, [baseDominator, canvas]);
  return <StyledNumberLineTool></StyledNumberLineTool>;
};

export default NumberLineTool;
