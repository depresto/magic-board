import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { useDrag, DragPreviewImage } from "react-dnd";
import styled from "styled-components";
import { WidgetDraggableProps, WidgetElementProps } from "../../types/widget";
import { widgetActiveColor, widgetColor } from ".";

const defaultIntervalStart = 0;
const defaultIntervalEnd = 1;
const defaultBaseDominator = 4;
const defaultNumerator = 1;
const defaultDominator = 2;

const StyledPreviewDiv = styled.div`
  cursor: pointer;
`;

type NumberLineToolProps = WidgetElementProps & {
  intervalStart?: number;
  intervalEnd?: number;
  baseDominator?: number;
  numerator?: number;
  dominator?: number;
};
const NumberLineTool: React.FC<NumberLineToolProps> = ({
  id,
  isPreview,
  canvas,
  initialX,
  initialY,
  initialAngle,
  intervalStart = defaultIntervalStart,
  intervalEnd = defaultIntervalEnd,
  baseDominator = defaultBaseDominator,
  numerator = defaultNumerator,
  dominator = defaultDominator,
}) => {
  const [lineGroup, setLineGroup] = useState<fabric.Group | null>(null);
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

    const numberLineStartX = 40;
    const numberLineStartY = 40;
    const numberLineWidth = 400;
    const numberLineHeight = 36;
    const numberLineGapHeight = 20;
    const arrowWidth = 20;
    const arrowLength = 8;

    const numberBarHeight = 20;
    const numberBarGapWidth = 4;
    const numberStartY = 0;

    const numberLineTotalGapCount =
      (intervalEnd - intervalStart) * baseDominator;
    const numberLineGapWidth = numberLineWidth / numberLineTotalGapCount;
    const numberLineHeightGap = (numberLineHeight - numberLineGapHeight) / 2;

    const lineGroupObjects: fabric.Object[] = [];
    const baseLine = new fabric.Line(
      [0, 0, numberLineWidth + arrowWidth + arrowLength, 0],
      {
        stroke: lineStrokeColor,
        strokeWidth: lineStrokeWidth,
        strokeLineCap: lineStrokeLinCap,
        left: numberLineStartX,
        top: numberLineStartY + numberLineHeight / 2,
      }
    );
    lineGroupObjects.push(baseLine);

    let counter = 0;
    for (
      let currentX = numberLineStartX;
      currentX <= numberLineStartX + numberLineWidth + numberLineGapWidth / 2;
      currentX += numberLineGapWidth
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
          top: isCurrentInteger
            ? numberLineStartY
            : numberLineStartY + numberLineHeightGap,
        }
      );
      lineGroupObjects.push(line);
      counter += 1;
    }

    const arrowUpper = new fabric.Line([0, 0, arrowLength, arrowLength], {
      stroke: lineStrokeColor,
      strokeWidth: lineStrokeWidth,
      strokeLineCap: lineStrokeLinCap,
      left: numberLineStartX + numberLineWidth + arrowWidth,
      top: numberLineStartY + numberLineHeight / 2 - arrowLength,
    });
    const arrowLower = new fabric.Line([0, arrowLength, arrowLength, 0], {
      stroke: lineStrokeColor,
      strokeWidth: lineStrokeWidth,
      strokeLineCap: lineStrokeLinCap,
      left: numberLineStartX + numberLineWidth + arrowWidth,
      top: numberLineStartY + numberLineHeight / 2,
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
        left:
          numberLineStartX + counter * numberLineGapWidth * baseDominator - 8,
        top: numberLineStartY + numberLineHeight + 6,
      });
      lineGroupObjects.push(line);
      counter += 1;
    }
    const basicLineGroup = new fabric.Group(lineGroupObjects);

    const numberBarObjects: fabric.Object[] = [];
    const numberBarTotalGapCount = (intervalEnd - intervalStart) * dominator;
    const numberBarWidth = numberLineWidth / numberBarTotalGapCount;
    counter = 0;
    for (
      let currentX = numberLineStartX;
      currentX < numberLineStartX + numberLineWidth;
      currentX += numberBarWidth
    ) {
      const rect = new fabric.Rect({
        fill: numerator <= counter ? widgetColor : widgetActiveColor,
        width: numberBarWidth - numberBarGapWidth,
        height: numberBarHeight,
        left: currentX + numberBarGapWidth / 2,
        top: numberStartY,
      });
      numberBarObjects.push(rect);
      counter += 1;
    }
    const numberLineGroup = new fabric.Group(numberBarObjects);

    const lineGroup = new fabric.Group([basicLineGroup, numberLineGroup], {
      name: id,
      left: initialX || 0,
      top: initialY || 0,
      angle: initialAngle || 0,
    });
    setLineGroup(lineGroup);
  }, [
    baseDominator,
    canvas,
    dominator,
    id,
    imgRef,
    initialAngle,
    initialX,
    initialY,
    intervalEnd,
    intervalStart,
    numerator,
  ]);

  useEffect(() => {
    if (lineGroup && imgRef) {
      const dataUrl = lineGroup.toDataURL({});
      setImgSrc(dataUrl);
      imgRef.src = dataUrl;
    }
  }, [imgRef, lineGroup]);

  useEffect(() => {
    if (lineGroup && canvas) {
      canvas.add(lineGroup);
    }
    return () => {
      if (lineGroup && canvas) {
        canvas.remove(lineGroup);
      }
    };
  }, [canvas, lineGroup]);

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
