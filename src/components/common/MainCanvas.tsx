import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { fabric } from "fabric";
import Konva from "konva";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { WidgetDraggableProps } from "../../types/widget";
import NumberLine from "../widget/NumberLine";
import { useToolbox } from "../../context/ToolboxContext";
import NumberLineBar from "../widget/NumberLineBar";
import { notEmpty } from "../../helpers";
import WidgetElement from "../widget/WidgetElement";
import CircleElement from "../widget/CircleElement";
import SquareElement from "../widget/SquareElement";

const magnetAngle = 5;
const magnetUnitAngle = 45;
const StyledCanvasWrapper = styled.div`
  &,
  .wrapper {
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

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [stage, setStage] = useState<Konva.Stage | null>(null);

  useEffect(() => {
    const containerElement = document.querySelector("#canvas-container");
    const stage = new Konva.Stage({
      container: "canvas-container",
      width: containerElement?.clientWidth,
      height: containerElement?.clientHeight,
    });
    setStage(stage);

    const onWindowResize = () => {
      if (containerElement) {
        stage.width(containerElement.clientWidth);
        stage.height(containerElement.clientHeight);
      }
    };

    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
      stage.destroy();
    };
  }, []);

  useEffect(() => {
    if (stage) {
      for (const canvasWidget of canvasWidgets) {
        let Widget: typeof WidgetElement | null = null;

        switch (canvasWidget.type) {
          case "number-line":
            Widget = NumberLine;
            break;
          case "number-line-bar":
            Widget = NumberLineBar;
            break;
          case "circle-element":
            Widget = CircleElement;
            break;
          case "square-element":
            Widget = SquareElement;
            break;
        }

        if (Widget) {
          const widget = new Widget({
            ...canvasWidget,
            initialX: canvasWidget.x,
            initialY: canvasWidget.y,
            initialAngle: canvasWidget.angle,
            ...canvasWidget.props,
          });
          stage.add(widget.widgetLayer);
        }
      }
    }
  }, [canvasWidgets, stage]);

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
            const widgetIds = activeObjects
              .map((activeObject) => activeObject.name)
              .filter(notEmpty);
            removeCanvasWidgets?.(widgetIds);
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

  return (
    <StyledCanvasWrapper>
      <div
        id="canvas-container"
        className="wrapper"
        ref={dropRef}
        {...collected}
      ></div>
    </StyledCanvasWrapper>
  );
};

export default MainCanvas;
