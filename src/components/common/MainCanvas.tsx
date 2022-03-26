import React from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { WidgetDraggableProps } from "../../types/widget";

const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  canvas {
    width: 100%;
    height: 100%;
  }
`;
const MainCanvas: React.FC = () => {
  const [collected, dropRef] = useDrop<WidgetDraggableProps>({
    accept: "widget",
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const result = monitor.getInitialClientOffset();
      console.log(item);

      return undefined;
    },
  });

  return (
    <StyledCanvasWrapper ref={dropRef} {...collected}>
      <canvas></canvas>
    </StyledCanvasWrapper>
  );
};

export default MainCanvas;
