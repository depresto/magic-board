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

const defaultIntervalStart = 0;
const defaultIntervalEnd = 1;
const defaultBaseDominator = 4;
const defaultNumerator = 1;
const defaultDominator = 2;

const StyledNumberLineBarImageWrapper = styled.div`
  padding: 4px 44px 4px 48px;
`;
const StyledNumberLineImageWrapper = styled.div`
  padding: 4px 20px 4px 40px;
`;

const NumberLineToolModal: React.FC = () => {
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
    <ToolModal title="????????????" type="number-line-tool">
      <StyledToolContentDiv>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="d-flex align-items-center mb-2">
              <span className="label mr-2">????????????</span>
              <NumberSelect
                defaultValue={0}
                value={intervalStart}
                onChange={(intervalStart) => {
                  setIntervalStart(intervalStart);
                  if (!intervalEnd || intervalStart >= intervalEnd) {
                    setIntervalEnd(intervalStart + 1);
                  }
                }}
              />
              <span className="mx-2">???</span>
              <NumberSelect
                defaultValue={1}
                startIndex={1}
                value={intervalEnd}
                onChange={(intervalEnd) => {
                  setIntervalEnd(intervalEnd);
                  if (intervalStart && intervalStart >= intervalEnd) {
                    setIntervalStart(intervalEnd - 1);
                  }
                }}
              />
            </div>
            <div className="d-flex align-items-center mb-2">
              <span className="label mr-4">?????????</span>
              <NumberSelect
                defaultValue={4}
                startIndex={1}
                value={baseDominator}
                onChange={setBaseDominator}
              />
            </div>
            <div className="d-flex align-items-center">
              <span className="label mr-4">??????</span>
              <div className="d-flex flex-column align-items-center">
                <NumberSelect
                  defaultValue={1}
                  value={numerator}
                  onChange={setNumerator}
                />
                <StyledDividerLineDiv />
                <NumberSelect
                  defaultValue={2}
                  value={dominator}
                  onChange={setDominator}
                />
              </div>
            </div>
          </div>

          <StyledButton onClick={onReset}>
            <FontAwesomeIcon icon={faRotateLeft} />
            <span className="ml-2">??????</span>
          </StyledButton>
        </div>
      </StyledToolContentDiv>

      <StyledModalPreviewImageWrapper className="pt-2">
        {numberLinePreviewBarImgSrc && (
          <StyledNumberLineBarImageWrapper
            ref={dragNumberLineBarImgRef}
            {...imgNumberLineBarCollected}
          >
            <DragPreviewImage
              connect={previewNumberLineBar}
              src={numberLinePreviewBarImgSrc}
            />
            <img
              className="number-line-bar"
              src={numberLinePreviewBarImgSrc}
              alt=""
            />
          </StyledNumberLineBarImageWrapper>
        )}
        {numberLinePreviewImgSrc && (
          <StyledNumberLineImageWrapper
            ref={dragNumberLineImgRef}
            {...imgNumberLineCollected}
          >
            <DragPreviewImage
              connect={previewNumberLine}
              src={numberLinePreviewImgSrc}
            />
            <img className="number-line" src={numberLinePreviewImgSrc} alt="" />
          </StyledNumberLineImageWrapper>
        )}
      </StyledModalPreviewImageWrapper>
    </ToolModal>
  );
};

export default NumberLineToolModal;
