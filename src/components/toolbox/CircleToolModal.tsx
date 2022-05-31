import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import ToolModal from "../common/ToolModal";
import NumberSelect from "../input/NumberSelect";
import NumberLine from "../widget/NumberLine";
import NumberLineBar from "../widget/NumberLineBar";
import { DragPreviewImage, useDrag } from "react-dnd";
import { WidgetDraggableProps } from "../../types/widget";
import {
  StyledButton,
  StyledDividerLineDiv,
  StyledModalPreviewImageWrapper,
  StyledToolContentDiv,
} from "./index.styled";
import CircleElement from "../widget/CircleElement";

const defaultIntervalStart = 0;
const defaultIntervalEnd = 1;
const defaultBaseDominator = 4;
const defaultNumerator = 1;
const defaultDominator = 2;

const CircleToolModal: React.FC = () => {
  const [intervalStart, setIntervalStart] = useState<number | undefined>();
  const [intervalEnd, setIntervalEnd] = useState<number | undefined>();

  const [baseDominator, setBaseDominator] = useState<number | undefined>();
  const [numerator, setNumerator] = useState<number | undefined>();
  const [dominator, setDominator] = useState<number | undefined>();

  const [imgNumberLineCollected, dragNumberLineImgRef, previewNumberLine] =
    useDrag<WidgetDraggableProps>({
      type: "widget",
      item: {
        widgetType: "number-line",
        widgetProps: {
          intervalStart: intervalStart ?? defaultIntervalStart,
          intervalEnd: intervalEnd ?? defaultIntervalEnd,
          baseDominator: baseDominator ?? defaultBaseDominator,
        },
      },
    });

  const [
    imgNumberLineBarCollected,
    dragNumberLineBarImgRef,
    previewNumberLineBar,
  ] = useDrag<WidgetDraggableProps>({
    type: "widget",
    item: {
      widgetType: "number-line-bar",
      widgetProps: {
        intervalStart: intervalStart ?? defaultIntervalStart,
        intervalEnd: intervalEnd ?? defaultIntervalEnd,
        baseDominator: baseDominator ?? defaultBaseDominator,
        numerator: numerator ?? defaultNumerator,
        dominator: dominator ?? defaultDominator,
      },
    },
  });

  const [numberLinePreviewImgSrc, setNumberLinePreviewImgSrc] = useState<
    string | null
  >(null);
  const [numberLinePreviewBarImgSrc, setNumberLinePreviewBarImgSrc] = useState<
    string | null
  >(null);

  const onReset = () => {
    setIntervalStart(undefined);
    setIntervalEnd(undefined);
    setBaseDominator(undefined);
    setNumerator(undefined);
    setDominator(undefined);
  };

  useEffect(() => {
    const numberLine = new NumberLine({
      intervalStart,
      intervalEnd,
      baseDominator,
    });
    setNumberLinePreviewImgSrc(numberLine.toImageUrl());
  }, [baseDominator, intervalEnd, intervalStart]);

  useEffect(() => {
    const numberLineBar = new NumberLineBar({
      intervalStart,
      intervalEnd,
      baseDominator,
      numerator,
      dominator,
    });
    setNumberLinePreviewBarImgSrc(numberLineBar.toImageUrl());
  }, [baseDominator, dominator, intervalEnd, intervalStart, numerator]);

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
