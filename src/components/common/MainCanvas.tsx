import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { fabric } from "fabric";
import styled from "styled-components";
import { WidgetDraggableProps, WidgetType } from "../../types/widget";
import NumberLineTool from "../widget/NumberLineTool";

type CanvasWidgetProps = {
  x: number;
  y: number;
  type: WidgetType;
  props: { [key: string]: number };
};

const sidebarOffset = 100;
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
  const [canvasWrapperRef, setCanvasWrapperRef] =
    useState<HTMLDivElement | null>(null);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  useEffect(() => {
    let canvas: fabric.Canvas | null = null;
    if (canvasRef) {
      canvas = new fabric.Canvas(canvasRef);
      setCanvas(canvas);
    }
    return () => {
      setCanvas(null);
      canvas?.dispose();
    };
  }, [canvasRef]);

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

  const [canvasWidgets, setCanvasWidgets] = useState<CanvasWidgetProps[]>([]);
  const [collected, dropRef] = useDrop<WidgetDraggableProps>({
    accept: "widget",
    drop: (item, monitor) => {
      const clientOffset = monitor.getSourceClientOffset();

      if (clientOffset) {
        setCanvasWidgets((canvasWidgets) => {
          const newWidget = {
            x: clientOffset.x - sidebarOffset,
            y: clientOffset.y,
            type: item.widgetType,
            props: item.widgetProps,
          };
          return [...canvasWidgets, newWidget];
        });
      }

      return undefined;
    },
  });

  return (
    <StyledCanvasWrapper ref={dropRef} {...collected}>
      <div className="wrapper" ref={setCanvasWrapperRef}>
        <canvas ref={setCanvasRef}></canvas>
        {canvasWidgets.map((canvasWidget, index) => {
          switch (canvasWidget.type) {
            case "number-line-tool":
              return (
                <NumberLineTool
                  key={index}
                  canvas={canvas}
                  initialX={canvasWidget.x}
                  initialY={canvasWidget.y}
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
