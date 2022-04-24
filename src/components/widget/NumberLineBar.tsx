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
  padding: 0 44px 0 48px;
`;

type NumberLineBarProps = WidgetElementProps & {
  intervalStart?: number;
  intervalEnd?: number;
  baseDominator?: number;
  numerator?: number;
  dominator?: number;
};
const NumberLineBar: React.FC<NumberLineBarProps> = ({
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
      widgetType: "number-line-bar",
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
    const numberLineStartX = 40;
    const numberLineWidth = 400;

    const numberBarHeight = 20;
    const numberBarGapWidth = 4;
    const numberStartY = 0;

    const numberBarObjects: fabric.Object[] = [];
    const numberBarTotalGapCount = (intervalEnd - intervalStart) * dominator;
    const numberBarWidth = numberLineWidth / numberBarTotalGapCount;
    let counter = 0;
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

    const lineGroup = new fabric.Group(numberBarObjects, {
      name: id,
      left: initialX || 0,
      top: initialY || 0,
      angle: initialAngle || 0,
    });
    setLineGroup(lineGroup);
  }, [dominator, id, initialAngle, initialX, initialY, intervalEnd, intervalStart, numerator]);

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

export default NumberLineBar;
