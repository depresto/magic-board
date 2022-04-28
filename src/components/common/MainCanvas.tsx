import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { fabric } from "fabric";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { WidgetDraggableProps } from "../../types/widget";
import NumberLine from "../widget/NumberLine";
import { useToolbox } from "../../context/ToolboxContext";
import NumberLineBar from "../widget/NumberLineBar";
import { notEmpty } from "../../helpers";

fabric.Object.prototype.setControlsVisibility({
  mb: false,
  ml: false,
  mr: false,
  mt: false,
  bl: false,
  br: false,
  tl: false,
  tr: false,
});

const magnetAngle = 5;
const magnetUnitAngle = 45;
const StyledCanvasWrapper = styled.div`
  &,
  .wrapper {
    width: 100%;
    height: 100%;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
`;
const MainCanvas: React.FC = () => {
  const {
    canvasWidgets,
    setCanvasWidget,
    setCanvasWidgetById,
    removeCanvasWidgets,
  } = useToolbox();
  const [collected, dropRef] = useDrop<WidgetDraggableProps>({
    accept: "widget",
    drop: (item, monitor) => {
      const clientOffset = monitor.getSourceClientOffset();

      if (clientOffset) {
        setCanvasWidget?.({
          id: nanoid(),
          x: clientOffset.x,
          y: clientOffset.y,
          angle: 0,
          type: item.widgetType,
          props: item.widgetProps,
        });
      }

      return undefined;
    },
  });

  const [canvasWrapperRef, setCanvasWrapperRef] =
    useState<HTMLDivElement | null>(null);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  useEffect(() => {
    let canvas: fabric.Canvas | null = null;
    if (canvasRef) {
      canvas = new fabric.Canvas(canvasRef);
      canvas.targetFindTolerance = 40;
      canvas.perPixelTargetFind = true;
      setCanvas(canvas);
    }
    return () => {
      setCanvas(null);
      canvas?.dispose();
    };
  }, [canvasRef]);

  useEffect(() => {
    let isObjectMoving = false;
    let isObjectRotating = false;

    const updateCanvasWidget = (event: fabric.IEvent<Event>) => {
      const elementId = event.target?.name;
      if (elementId) {
        const { left, top, angle } = (event.transform as any).target;
        setCanvasWidgetById?.(elementId, { x: left, y: top, angle });
      }
    };

    const onRotating = (event: fabric.IEvent<Event>) => {
      const { angle } = (event.transform as any).target;
      const object = event.target as any;

      if (object) {
        if (
          angle % magnetUnitAngle < magnetAngle ||
          (angle - 360) % magnetUnitAngle > -magnetAngle
        ) {
          const newAngle =
            Math.round(angle / magnetUnitAngle) * magnetUnitAngle;
          object._setOriginToCenter();
          object.set("angle", newAngle).setCoords();
          object._resetOrigin();
        }
      }

      isObjectRotating = true;
    };
    const onMoving = () => {
      isObjectMoving = true;
    };
    const onMouseUp = (event: fabric.IEvent<Event>) => {
      if (!event.transform) {
        return;
      }

      if (isObjectMoving) {
        isObjectMoving = false;
        updateCanvasWidget(event);
      }

      if (isObjectRotating) {
        isObjectRotating = false;
        updateCanvasWidget(event);
      }
    };

    if (canvas) {
      canvas.on("object:rotating", onRotating);
      canvas.on("object:moving", onMoving);
      canvas.on("mouse:up", onMouseUp);
    }

    return () => {
      if (canvas) {
        canvas.off("object:rotating", onRotating);
        canvas.off("object:moving", onMoving);
        canvas.off("mouse:up", onMouseUp);
      }
    };
  }, [canvas, setCanvasWidgetById]);

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      const activeObjects = canvas?.getActiveObjects();
      switch (event.key) {
        case "Backspace":
        case "Delete":
          if (activeObjects) {
            canvas?.remove(...activeObjects);
            const widgetIds = activeObjects.map(activeObject => activeObject.name).filter(notEmpty)
            removeCanvasWidgets?.(widgetIds)
          }
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  });

  useEffect(() => {
    const onWindowResize = () => {
      if (canvasWrapperRef) {
        const width = canvasWrapperRef.clientWidth;
        const height = canvasWrapperRef.clientHeight;
        const context = canvas?.getContext();

        if (canvas && context) {
          canvas.setWidth(width);
          canvas.setHeight(height);
        }
      }
    };
    onWindowResize();

    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  });

  return (
    <StyledCanvasWrapper ref={dropRef} {...collected}>
      <div className="wrapper" ref={setCanvasWrapperRef}>
        <canvas ref={setCanvasRef}></canvas>
        {canvasWidgets.map((canvasWidget) => {
          switch (canvasWidget.type) {
            case "number-line":
              return (
                <NumberLine
                  key={canvasWidget.id}
                  id={canvasWidget.id}
                  canvas={canvas}
                  initialX={canvasWidget.x}
                  initialY={canvasWidget.y}
                  initialAngle={canvasWidget.angle}
                  {...(canvasWidget.props as any)}
                />
              );
            case "number-line-bar":
              return (
                <NumberLineBar
                  key={canvasWidget.id}
                  id={canvasWidget.id}
                  canvas={canvas}
                  initialX={canvasWidget.x}
                  initialY={canvasWidget.y}
                  initialAngle={canvasWidget.angle}
                  {...(canvasWidget.props as any)}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </StyledCanvasWrapper>
  );
};

export default MainCanvas;
