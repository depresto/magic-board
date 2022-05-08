import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { useDrag, DragPreviewImage } from "react-dnd";
import styled from "styled-components";
import { WidgetDraggableProps, WidgetElementProps } from "../../types/widget";

const defaultIntervalStart = 0;
const defaultIntervalEnd = 1;
const defaultBaseDominator = 4;

const StyledPreviewDiv = styled.div`
  cursor: pointer;
  padding: 0 20px 0 40px;
`;

type NumberLineProps = WidgetElementProps & {
  intervalStart?: number;
  intervalEnd?: number;
  baseDominator?: number;
};
const NumberLine: React.FC<NumberLineProps> = ({
  id,
  isPreview,
  canvas,
  initialX,
  initialY,
  initialAngle,
  intervalStart = defaultIntervalStart,
  intervalEnd = defaultIntervalEnd,
  baseDominator = defaultBaseDominator,
}) => {
  const [numberLineWidth, setNumberLineWidth] = useState(400);
  const [lineGroup, setLineGroup] = useState<fabric.Group | null>(null);
  const [arrowObject, setArrowObject] = useState<fabric.Group | null>(null);
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);
  const [imgSrc, setImgSrc] = useState("");

  const [imgCollected, dragImgRef, preview] = useDrag<WidgetDraggableProps>({
    type: "widget",
    item: {
      widgetType: "number-line",
      widgetProps: {
        intervalStart,
        intervalEnd,
        baseDominator,
      },
    },
  });

  useEffect(() => {
    const lineStrokeColor = "black";
    const lineStrokeLinCap = "round";
    const lineStrokeWidth = 2;
    const arrowStrokeWidth = 3;
    const fontSize = 28;
    const fontFamily = "san-serif";

    const numberLineStartX = 0;
    const numberLineStartY = 0;
    const numberLineHeight = 36;
    const numberLineGapHeight = 20;
    const arrowWidth = 20;
    const arrowLength = 8;

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
      strokeWidth: arrowStrokeWidth,
      strokeLineCap: lineStrokeLinCap,
      left: numberLineStartX + numberLineWidth + arrowWidth,
      top: numberLineStartY + numberLineHeight / 2 - arrowLength,
    });
    const arrowLower = new fabric.Line([0, arrowLength, arrowLength, 0], {
      stroke: lineStrokeColor,
      strokeWidth: arrowStrokeWidth,
      strokeLineCap: lineStrokeLinCap,
      left: numberLineStartX + numberLineWidth + arrowWidth,
      top: numberLineStartY + numberLineHeight / 2,
    });
    const arrowObject = new fabric.Group([arrowUpper, arrowLower], {
      perPixelTargetFind: true,
      hoverCursor: "pointer",
    });
    setArrowObject(arrowObject);
    lineGroupObjects.push(arrowObject);

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

    const lineGroup = new fabric.Group(lineGroupObjects, {
      name: id,
      left: initialX || 0,
      top: initialY || 0,
      angle: initialAngle || 0,
      subTargetCheck: true,
    });
    setLineGroup(lineGroup);
  }, [
    baseDominator,
    id,
    initialAngle,
    initialX,
    initialY,
    intervalEnd,
    intervalStart,
    numberLineWidth,
  ]);

  const [isArrowDragging, setIsArrowDragging] = useState(false);
  useEffect(() => {
    const onArrowMouseOver = (e: fabric.IEvent<Event>) => {
      const objects: fabric.Line[] = (e.target as any)._objects;
      for (const object of objects) {
        object.set("stroke", "red");
      }
      e.target?.canvas?.requestRenderAll();
    };
    const onArrowMouseOut = (e: fabric.IEvent<Event>) => {
      const objects: fabric.Line[] = (e.target as any)._objects;
      for (const object of objects) {
        object.set("stroke", "black");
      }
      e.target?.canvas?.requestRenderAll();
    };
    const onArrowMouseDown = () => {
      setIsArrowDragging(true);
    };
    const onArrowMouseUp = () => {
      setIsArrowDragging(false);
    };

    arrowObject?.on("mouseover", onArrowMouseOver);
    arrowObject?.on("mouseout", onArrowMouseOut);
    arrowObject?.on("mousedown", onArrowMouseDown);
    arrowObject?.on("mouseup", onArrowMouseUp);
    return () => {
      arrowObject?.off("mouseover", onArrowMouseOver);
      arrowObject?.off("mouseout", onArrowMouseOut);
      arrowObject?.off("mousedown", onArrowMouseDown);
      arrowObject?.off("mouseup", onArrowMouseUp);
    };
  }, [arrowObject]);

  useEffect(() => {
    const onArrowMouseMove = (e: fabric.IEvent<Event>) => {
      if (e.target && isArrowDragging) {
        const rightPosX = (e.target.left || 0) + (e.target.width || 0);
        const objectWidthDelta = (e.absolutePointer?.x || 0) - rightPosX;
        setNumberLineWidth(
          (numberLineWidth) => numberLineWidth + objectWidthDelta
        );
      }

      if (lineGroup) {
        lineGroup.lockMovementX = isArrowDragging;
        lineGroup.lockMovementY = isArrowDragging;
      }
    };

    arrowObject?.on("mousemove", onArrowMouseMove);
    return () => {
      arrowObject?.off("mousemove", onArrowMouseMove);
    };
  }, [arrowObject, isArrowDragging, lineGroup]);

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

export default NumberLine;
