import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ToolModal from "../common/ToolModal";
import { DragPreviewImage, useDrag } from "react-dnd";
import { WidgetDraggableProps } from "../../types/widget";
import { StyledModalPreviewImageWrapper } from "./index.styled";
import CircleElement from "../widget/CircleElement";

const CircleToolModal: React.FC = () => {
  return (
    <ToolModal title="圓形元件" type="circle-tool">
      <StyledModalPreviewImageWrapper className="pt-2">
        <div className="d-flex flex-wrap">
          {[...Array(10)].map((_, index) => {
            return (
              <PreviewableCircleElement
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

const StyledPreviewableCircleWrapper = styled.div`
  width: 100px;
`;

const PreviewableCircleElement: React.FC<{
  numerator: number;
  dominator: number;
}> = ({ numerator, dominator }) => {
  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>(null);
  const [imgCollected, dragImgRef, preview] = useDrag<WidgetDraggableProps>({
    type: "widget",
    item: {
      widgetType: "circle-element",
      widgetProps: {
        numerator,
        dominator,
      },
    },
  });

  useEffect(() => {
    const circleElement = new CircleElement({
      numerator,
      dominator,
    });
    setPreviewImageSrc(circleElement.toImageUrl());
  }, [dominator, numerator]);

  if (previewImageSrc) {
    return (
      <StyledPreviewableCircleWrapper ref={dragImgRef} {...imgCollected}>
        <DragPreviewImage connect={preview} src={previewImageSrc} />
        <img className="preview-image" src={previewImageSrc} alt="" />
      </StyledPreviewableCircleWrapper>
    );
  } else {
    return null;
  }
};

export default CircleToolModal;
