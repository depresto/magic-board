import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { useDrag, DragPreviewImage } from "react-dnd";
import styled from "styled-components";
import { WidgetDraggableProps } from "../../types/widget";

const defaultIntervalStart = 0;
const defaultIntervalEnd = 1;
const defaultBaseDominator = 4;
const defaultNumerator = 1;
const defaultDominator = 2;

const StyledPreviewDiv = styled.div`
  cursor: pointer;
`;

type NumberLineToolProps = {
  isPreview?: boolean;
  canvas: fabric.Canvas | null;
  initialX?: number;
  initialY?: number;
  intervalStart?: number;
  intervalEnd?: number;
  baseDominator?: number;
  numerator?: number;
  dominator?: number;
};
const NumberLineTool: React.FC<NumberLineToolProps> = ({
  isPreview,
  canvas,
  initialX,
  initialY,
  intervalStart = defaultIntervalStart,
  intervalEnd = defaultIntervalEnd,
  baseDominator = defaultBaseDominator,
  numerator = defaultNumerator,
  dominator = defaultDominator,
}) => {
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);
  const [imgSrc, setImgSrc] = useState("");

  const [imgCollected, dragImgRef, preview] = useDrag<WidgetDraggableProps>({
    type: "widget",
    item: {
      widgetType: "number-line-tool",
      widgetProps: {
        intervalStart,
        intervalEnd,
        baseDominator,
        numerator,
        dominator,
      },
    },
  });

  useEffect(() => {
    const lineStrokeColor = "black";
    const lineStrokeLinCap = "round";
    const lineStrokeWidth = 2;
    const fontSize = 28;
    const fontFamily = "san-serif";

    const startX = 40;
    const startY = 40;
    const numberLineWidth = 400;
    const numberLineHeight = 36;
    const numberLineGapHeight = 20;
    const arrowWidth = 20;
    const arrowLength = 8;

    const totalGapCount = (intervalEnd - intervalStart) * baseDominator;
    const lineGapWidth = numberLineWidth / totalGapCount;
    const numberLineHeightGap = (numberLineHeight - numberLineGapHeight) / 2;

    const lineGroupObjects: fabric.Object[] = [];
    const baseLine = new fabric.Line(
      [0, 0, numberLineWidth + arrowWidth + arrowLength, 0],
      {
        stroke: lineStrokeColor,
        strokeWidth: lineStrokeWidth,
        strokeLineCap: lineStrokeLinCap,
        left: startX,
        top: startY + numberLineHeight / 2,
      }
    );
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
          stroke: lineStrokeColor,
          strokeWidth: lineStrokeWidth,
          strokeLineCap: lineStrokeLinCap,
          left: currentX,
          top: isCurrentInteger ? startY : startY + numberLineHeightGap,
        }
      );
      lineGroupObjects.push(line);
      counter += 1;
    }

    const arrowUpper = new fabric.Line([0, 0, arrowLength, arrowLength], {
      stroke: lineStrokeColor,
      strokeWidth: lineStrokeWidth,
      strokeLineCap: lineStrokeLinCap,
      left: startX + numberLineWidth + arrowWidth,
      top: startY + numberLineHeight / 2 - arrowLength,
    });
    const arrowLower = new fabric.Line([0, arrowLength, arrowLength, 0], {
      stroke: lineStrokeColor,
      strokeWidth: lineStrokeWidth,
      strokeLineCap: lineStrokeLinCap,
      left: startX + numberLineWidth + arrowWidth,
      top: startY + numberLineHeight / 2,
    });
    lineGroupObjects.push(arrowUpper);
    lineGroupObjects.push(arrowLower);

    counter = 0;
    for (
      let integerCounter = intervalStart;
      integerCounter <= intervalEnd;
      integerCounter += 1
    ) {
      const line = new fabric.Text(integerCounter.toString(), {
        fontSize,
        fontFamily,
        left: startX + counter * lineGapWidth * baseDominator - 8,
        top: startY + numberLineHeight + 6,
      });
      lineGroupObjects.push(line);
      counter += 1;
    }

    const lineGroup = new fabric.Group(lineGroupObjects, {
      left: initialX || 0,
      top: initialY || 0,
    });

    if (imgRef) {
      const dataUrl = lineGroup.toDataURL({});
      setImgSrc(dataUrl);
      imgRef.src = dataUrl;
    }

    if (canvas) {
      canvas.add(lineGroup);
    }

    return () => {
      if (canvas) {
        canvas.remove(lineGroup);
      }
    };
  }, [
    baseDominator,
    canvas,
    imgRef,
    initialX,
    initialY,
    intervalEnd,
    intervalStart,
  ]);

  if (isPreview) {
    return (
      <StyledPreviewDiv ref={dragImgRef} {...imgCollected}>
        <DragPreviewImage connect={preview} src={imgSrc} />
        <img ref={setImgRef} alt="" />
      </StyledPreviewDiv>
    );
  }

  return <div></div>;
};

export default NumberLineTool;
