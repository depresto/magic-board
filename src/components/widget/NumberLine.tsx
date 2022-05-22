import React, { useEffect, useState } from "react";
import Konva from "konva";
import { useDrag, DragPreviewImage } from "react-dnd";
import styled from "styled-components";
import { WidgetDraggableProps, WidgetElementProps } from "../../types/widget";
import { KonvaEventObject } from "konva/lib/Node";
import WidgetElement from "./WidgetElement";

const defaultIntervalStart = 0;
const defaultIntervalEnd = 1;
const defaultBaseDominator = 4;

const lineStrokeColor = "black";
const lineStrokeLinCap = "round";
const lineStrokeWidth = 2;
const arrowStrokeWidth = 3;
const fontSize = 28;
const fontFamily = "san-serif";

const numberLineWidth = 400;
const numberLineStartX = 10;
const numberLineStartY = 0;
const numberLineHeight = 36;
const numberLineGapHeight = 20;
const arrowWidth = 20;
const arrowLength = 8;

const StyledPreviewDiv = styled.div`
  cursor: pointer;
  padding: 0 20px 0 40px;
`;

type NumberLineProps = WidgetElementProps & {
  intervalStart?: number;
  intervalEnd?: number;
  baseDominator?: number;
};
class NumberLine extends WidgetElement {
  arrowObject: Konva.Group;

  constructor({
    intervalStart = defaultIntervalStart,
    intervalEnd = defaultIntervalEnd,
    baseDominator = defaultBaseDominator,
    ...options
  }: NumberLineProps) {
    super(options);

    const numberLineTotalGapCount =
      (intervalEnd - intervalStart) * baseDominator;
    const numberLineGapWidth = numberLineWidth / numberLineTotalGapCount;
    const numberLineHeightGap = (numberLineHeight - numberLineGapHeight) / 2;

    const lineLayerObjects = new Konva.Group();
    const baseLine = new Konva.Line({
      points: [
        0,
        numberLineStartY + numberLineHeight / 2,
        numberLineWidth + arrowWidth + arrowLength,
        numberLineStartY + numberLineHeight / 2,
      ],
      stroke: lineStrokeColor,
      strokeWidth: lineStrokeWidth,
      strokeLineCap: lineStrokeLinCap,
      x: numberLineStartX,
      y: numberLineStartY,
    });
    lineLayerObjects.add(baseLine);

    let counter = 0;
    for (
      let currentX = 0;
      currentX <= numberLineWidth + numberLineGapWidth / 2;
      currentX += numberLineGapWidth
    ) {
      const isCurrentInteger = counter % baseDominator === 0;
      const line = new Konva.Line({
        points: [
          currentX,
          isCurrentInteger ? 0 : numberLineHeightGap,
          currentX,
          isCurrentInteger
            ? numberLineHeight
            : numberLineHeight - numberLineHeightGap,
        ],
        stroke: lineStrokeColor,
        strokeWidth: lineStrokeWidth,
        strokeLineCap: lineStrokeLinCap,
        x: numberLineStartX,
        y: numberLineStartY,
      });
      lineLayerObjects.add(line);
      counter += 1;
    }

    const arrowObject = new Konva.Group({
      perPixelTargetFind: true,
      hoverCursor: "pointer",
    });
    const arrowUpper = new Konva.Line({
      points: [0, 0, arrowLength, arrowLength],
      stroke: lineStrokeColor,
      strokeWidth: arrowStrokeWidth,
      strokeLineCap: lineStrokeLinCap,
      x: numberLineStartX + numberLineWidth + arrowWidth,
      y: numberLineStartY + numberLineHeight / 2 - arrowLength,
    });
    const arrowLower = new Konva.Line({
      points: [0, arrowLength, arrowLength, 0],
      stroke: lineStrokeColor,
      strokeWidth: arrowStrokeWidth,
      strokeLineCap: lineStrokeLinCap,
      x: numberLineStartX + numberLineWidth + arrowWidth,
      y: numberLineStartY + numberLineHeight / 2,
    });
    arrowObject.add(...[arrowUpper, arrowLower]);
    this.arrowObject = arrowObject;
    lineLayerObjects.add(arrowObject);

    counter = 0;
    for (
      let integerCounter = intervalStart;
      integerCounter <= intervalEnd;
      integerCounter += 1
    ) {
      const line = new Konva.Text({
        text: integerCounter.toString(),
        fontSize,
        fontFamily,
        x: numberLineStartX + counter * numberLineGapWidth * baseDominator - 8,
        y: numberLineStartY + numberLineHeight + 6,
      });
      lineLayerObjects.add(line);
      counter += 1;
    }

    this.widgetGroup.add(lineLayerObjects);
  }
}
// const NumberLine: React.FC<NumberLineProps> = ({
//   id,
//   isPreview,
//   canvas,
//   initialX,
//   initialY,
//   initialAngle,
//   intervalStart = defaultIntervalStart,
//   intervalEnd = defaultIntervalEnd,
//   baseDominator = defaultBaseDominator,
// }) => {
//   const [numberLineWidth, setNumberLineWidth] = useState(400);
//   const [lineLayer, setLineLayer] = useState<Konva.Layer | null>(null);
//   const [arrowObject, setArrowObject] = useState<Konva.Group | null>(null);
//   const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);
//   const [imgSrc, setImgSrc] = useState("");

//   const [imgCollected, dragImgRef, preview] = useDrag<WidgetDraggableProps>({
//     type: "widget",
//     item: {
//       widgetType: "number-line",
//       widgetProps: {
//         intervalStart,
//         intervalEnd,
//         baseDominator,
//       },
//     },
//   });

//   useEffect(() => {
//     const numberLineTotalGapCount =
//       (intervalEnd - intervalStart) * baseDominator;
//     const numberLineGapWidth = numberLineWidth / numberLineTotalGapCount;
//     const numberLineHeightGap = (numberLineHeight - numberLineGapHeight) / 2;

//     const lineLayerObjects = new Konva.Group();
//     const baseLine = new Konva.Line({
//       points: [
//         0,
//         numberLineStartY + numberLineHeight / 2,
//         numberLineWidth + arrowWidth + arrowLength,
//         numberLineStartY + numberLineHeight / 2,
//       ],
//       stroke: lineStrokeColor,
//       strokeWidth: lineStrokeWidth,
//       strokeLineCap: lineStrokeLinCap,
//       x: numberLineStartX,
//       y: numberLineStartY,
//     });
//     lineLayerObjects.add(baseLine);

//     let counter = 0;
//     for (
//       let currentX = 0;
//       currentX <= numberLineWidth + numberLineGapWidth / 2;
//       currentX += numberLineGapWidth
//     ) {
//       const isCurrentInteger = counter % baseDominator === 0;
//       const line = new Konva.Line({
//         points: [
//           currentX,
//           isCurrentInteger ? 0 : numberLineHeightGap,
//           currentX,
//           isCurrentInteger
//             ? numberLineHeight
//             : numberLineHeight - numberLineHeightGap,
//         ],
//         stroke: lineStrokeColor,
//         strokeWidth: lineStrokeWidth,
//         strokeLineCap: lineStrokeLinCap,
//         x: numberLineStartX,
//         y: numberLineStartY,
//       });
//       lineLayerObjects.add(line);
//       counter += 1;
//     }

//     const arrowObject = new Konva.Group({
//       perPixelTargetFind: true,
//       hoverCursor: "pointer",
//     });
//     const arrowUpper = new Konva.Line({
//       points: [0, 0, arrowLength, arrowLength],
//       stroke: lineStrokeColor,
//       strokeWidth: arrowStrokeWidth,
//       strokeLineCap: lineStrokeLinCap,
//       x: numberLineStartX + numberLineWidth + arrowWidth,
//       y: numberLineStartY + numberLineHeight / 2 - arrowLength,
//     });
//     const arrowLower = new Konva.Line({
//       points: [0, arrowLength, arrowLength, 0],
//       stroke: lineStrokeColor,
//       strokeWidth: arrowStrokeWidth,
//       strokeLineCap: lineStrokeLinCap,
//       x: numberLineStartX + numberLineWidth + arrowWidth,
//       y: numberLineStartY + numberLineHeight / 2,
//     });
//     arrowObject.add(...[arrowUpper, arrowLower]);
//     setArrowObject(arrowObject);
//     lineLayerObjects.add(arrowObject);

//     counter = 0;
//     for (
//       let integerCounter = intervalStart;
//       integerCounter <= intervalEnd;
//       integerCounter += 1
//     ) {
//       const line = new Konva.Text({
//         text: integerCounter.toString(),
//         fontSize,
//         fontFamily,
//         x: numberLineStartX + counter * numberLineGapWidth * baseDominator - 8,
//         y: numberLineStartY + numberLineHeight + 6,
//       });
//       lineLayerObjects.add(line);
//       counter += 1;
//     }

//     const lineLayer = new Konva.Layer({
//       id,
//       x: initialX || 0,
//       y: initialY || 0,
//       angle: initialAngle || 0,
//       subTargetCheck: true,
//     });
//     lineLayer.add(lineLayerObjects);
//     setLineLayer(lineLayer);
//   }, [
//     baseDominator,
//     id,
//     initialAngle,
//     initialX,
//     initialY,
//     intervalEnd,
//     intervalStart,
//     numberLineWidth,
//   ]);

//   const [isArrowDragging, setIsArrowDragging] = useState(false);
//   useEffect(() => {
//     const onArrowMouseOver = (e: KonvaEventObject<Event>) => {
//       const objects: Konva.Line[] = (e.target as any)._objects;
//       for (const object of objects) {
//         object.setAttr("stroke", "red");
//       }
//       // e.target?.canvas?.requestRenderAll();
//     };
//     const onArrowMouseOut = (e: KonvaEventObject<Event>) => {
//       const objects: Konva.Line[] = (e.target as any)._objects;
//       for (const object of objects) {
//         object.setAttr("stroke", "black");
//       }
//       // e.target?.canvas?.requestRenderAll();
//     };
//     const onArrowMouseDown = () => {
//       setIsArrowDragging(true);
//     };
//     const onArrowMouseUp = () => {
//       setIsArrowDragging(false);
//     };

//     arrowObject?.on("mouseover", onArrowMouseOver);
//     arrowObject?.on("mouseout", onArrowMouseOut);
//     arrowObject?.on("mousedown", onArrowMouseDown);
//     arrowObject?.on("mouseup", onArrowMouseUp);
//     return () => {
//       arrowObject?.off("mouseover", onArrowMouseOver);
//       arrowObject?.off("mouseout", onArrowMouseOut);
//       arrowObject?.off("mousedown", onArrowMouseDown);
//       arrowObject?.off("mouseup", onArrowMouseUp);
//     };
//   }, [arrowObject]);

//   // useEffect(() => {
//   //   const onArrowMouseMove = (e: KonvaEventObject<Event>) => {
//   //     if (e.target && isArrowDragging) {
//   //       const rightPosX = (e.target.x || 0) + (e.target.width || 0);
//   //       const objectWidthDelta = (e.absolutePointer?.x || 0) - rightPosX;
//   //       setNumberLineWidth(
//   //         (numberLineWidth) => numberLineWidth + objectWidthDelta
//   //       );
//   //     }

//   //     if (lineLayer) {
//   //       lineLayer.lockMovementX = isArrowDragging;
//   //       lineLayer.lockMovementY = isArrowDragging;
//   //     }
//   //   };

//   //   arrowObject?.on("mousemove", onArrowMouseMove);
//   //   return () => {
//   //     arrowObject?.off("mousemove", onArrowMouseMove);
//   //   };
//   // }, [arrowObject, isArrowDragging, lineLayer]);

//   useEffect(() => {
//     if (lineLayer && imgRef) {
//       const dataUrl = lineLayer.toDataURL({});
//       setImgSrc(dataUrl);
//       imgRef.src = dataUrl;
//     }
//   }, [imgRef, lineLayer]);

//   useEffect(() => {
//     if (lineLayer && canvas) {
//       canvas.add(lineLayer);
//     }
//     return () => {
//       if (lineLayer) {
//         lineLayer.remove();
//       }
//     };
//   }, [canvas, lineLayer]);

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

export default NumberLine;
