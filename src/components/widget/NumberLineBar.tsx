import React, { useEffect, useState } from "react";
import Konva from "konva";
import { useDrag, DragPreviewImage } from "react-dnd";
import styled from "styled-components";
import { WidgetDraggableProps, WidgetElementProps } from "../../types/widget";
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

    this.widgetLayer.add(numberBarObjects)
  }
}
// const NumberLineBar: React.FC<NumberLineBarProps> = ({
//   id,
//   isPreview,
//   canvas,
//   initialX,
//   initialY,
//   initialAngle,
//   intervalStart = defaultIntervalStart,
//   intervalEnd = defaultIntervalEnd,
//   baseDominator = defaultBaseDominator,
//   numerator = defaultNumerator,
//   dominator = defaultDominator,
// }) => {
//   const [lineGroup, setLineGroup] = useState<Konva.Layer | null>(null);
//   const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);
//   const [imgSrc, setImgSrc] = useState("");

//   const [imgCollected, dragImgRef, preview] = useDrag<WidgetDraggableProps>({
//     type: "widget",
//     item: {
//       widgetType: "number-line-bar",
//       widgetProps: {
//         intervalStart,
//         intervalEnd,
//         baseDominator,
//         numerator,
//         dominator,
//       },
//     },
//   });

//   useEffect(() => {
//     const numberLineStartX = 0;
//     const numberLineWidth = 400;

//     const numberBarHeight = 20;
//     const numberBarGapWidth = 4;
//     const numberStartY = 0;

//     const numberBarObjects = new Konva.Group();
//     const numberBarTotalGapCount = (intervalEnd - intervalStart) * dominator;
//     const numberBarWidth = numberLineWidth / numberBarTotalGapCount;
//     let counter = 0;
//     for (
//       let currentX = numberLineStartX;
//       currentX < numberLineStartX + numberLineWidth;
//       currentX += numberBarWidth
//     ) {
//       const rect = new Konva.Rect({
//         fill: numerator <= counter ? widgetColor : widgetActiveColor,
//         width: numberBarWidth - numberBarGapWidth,
//         height: numberBarHeight,
//         x: currentX + numberBarGapWidth / 2,
//         y: numberStartY,
//       });
//       numberBarObjects.add(rect);
//       counter += 1;
//     }

//     const lineGroup = new Konva.Layer({
//       name: id,
//       x: initialX || 0,
//       y: initialY || 0,
//       angle: initialAngle || 0,
//     });
//     lineGroup.add(numberBarObjects);
//     setLineGroup(lineGroup);
//   }, [
//     dominator,
//     id,
//     initialAngle,
//     initialX,
//     initialY,
//     intervalEnd,
//     intervalStart,
//     numerator,
//   ]);

//   useEffect(() => {
//     if (lineGroup && imgRef) {
//       const dataUrl = lineGroup.toDataURL({});
//       setImgSrc(dataUrl);
//       imgRef.src = dataUrl;
//     }
//   }, [imgRef, lineGroup]);

//   useEffect(() => {
//     if (lineGroup && canvas) {
//       canvas.add(lineGroup);
//     }
//     return () => {
//       if (lineGroup) {
//         lineGroup.remove();
//       }
//     };
//   }, [canvas, lineGroup]);

//   if (isPreview) {
//     return (
//       <StyledPreviewDiv ref={dragImgRef} {...imgCollected}>
//         <DragPreviewImage connect={preview} src={imgSrc} />
//         <img ref={setImgRef} alt="" />
//       </StyledPreviewDiv>
//     );
//   }

//   return <div></div>;
// };

export default NumberLineBar;
