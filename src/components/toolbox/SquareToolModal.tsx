import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ToolModal from "../common/ToolModal";
import { DragPreviewImage, useDrag } from "react-dnd";
import { WidgetDraggableProps } from "../../types/widget";
import { StyledModalPreviewImageWrapper } from "./index.styled";
import SquareElement from "../widget/SquareElement";

const SquareToolModal: React.FC = () => {
  return (
    <ToolModal title="方形元件" type="square-tool">
      <StyledModalPreviewImageWrapper className="pt-2">
        <div className="d-flex flex-wrap">
          {[...Array(10)].map((_, index) => {
            return (
              <PreviewableSquareElement
                key={index}
                dominator={index + 1}
                numerator={1}
              />
            );
          })}
        </div>
      </StyledModalPreviewImageWrapper>
    </ToolModal>
  );
};

const StyledPreviewableSquareWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 4px;
  text-align: center;
`;

const PreviewableSquareElement: React.FC<{
  numerator: number;
  dominator: number;
}> = ({ numerator, dominator }) => {
  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>(null);
  const [imgCollected, dragImgRef, preview] = useDrag<WidgetDraggableProps>({
    type: "widget",
    item: {
      widgetType: "square-element",
      widgetProps: {
        numerator,
        dominator,
      },
    },
  });

  useEffect(() => {
    const squareElement = new SquareElement({
      numerator,
      dominator,
    });
    setPreviewImageSrc(squareElement.toImageUrl());
  }, [dominator, numerator]);

  if (previewImageSrc) {
    return (
      <StyledPreviewableSquareWrapper ref={dragImgRef} {...imgCollected}>
        <DragPreviewImage connect={preview} src={previewImageSrc} />
        <img className="preview-image" src={previewImageSrc} alt="" />
      </StyledPreviewableSquareWrapper>
    );
  } else {
    return null;
  }
};

export default SquareToolModal;
