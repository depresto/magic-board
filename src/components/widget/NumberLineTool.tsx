import React, { useEffect } from "react";
import styled from "styled-components";
import { fabric } from "fabric";

const StyledNumberLineTool = styled.div``;

type NumberLineToolProps = {
  isPreview?: boolean;
  canvasRef: HTMLCanvasElement | null;
  intervalStart: number;
  intervalEnd: number;
  baseDominator: number;
  numerator: number;
  dominator: number;
};
const NumberLineTool: React.FC<NumberLineToolProps> = ({
  isPreview,
  canvasRef,
  intervalStart,
  intervalEnd,
  baseDominator,
  numerator,
  dominator,
}) => {
  useEffect(() => {
    if (canvasRef) {
      const canvas = new fabric.Canvas(canvasRef);
      // const circle = new fabric.Circle({
      //   radius: 20,
      //   fill: "green",
      //   left: 100,
      //   top: 100,
      // });
      // circle.cornerSize = 6;

      const lineGroupObjects: fabric.Object[] = [];
      const baseLine = new fabric.Line([0, 0, 500, 0], {
        stroke: "black",
        fill: "black",
        strokeWidth: 2,
        strokeLineCap: "round",
        left: 0,
        top: 20,
      });
      lineGroupObjects.push(baseLine);
      for (let currentX = 0; currentX < 200; currentX += 20) {
        const line = new fabric.Line([currentX, 0, currentX, 40], {
          stroke: "black",
          fill: "black",
          strokeWidth: 2,
          strokeLineCap: "round",
          left: currentX,
          top: 0,
        });
        lineGroupObjects.push(line);
      }

      const lineGroup = new fabric.Group(lineGroupObjects);
      // canvas.add(circle);
      canvas.add(lineGroup);
      canvas.selection = true;
      canvas.targetFindTolerance = 4;
      canvas.perPixelTargetFind = true;
    }
  }, [canvasRef]);
  return <StyledNumberLineTool></StyledNumberLineTool>;
};

export default NumberLineTool;
