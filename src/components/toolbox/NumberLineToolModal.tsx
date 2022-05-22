import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import ToolModal from "../common/ToolModal";
import NumberSelect from "../input/NumberSelect";
import NumberLine from "../widget/NumberLine";
import NumberLineBar from "../widget/NumberLineBar";

const StyledNumberLineToolContentDiv = styled.div`
  background-color: #c4c4c4;
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
`;
const StyledDividerLineDiv = styled.div`
  border-bottom: 1px solid #000000;
  width: 80px;
  margin: 4px 0;
`;
const StyledImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  flex-grow: 1;
  img {
    max-width: 100%;
    height: auto;
    cursor: pointer;
  }
  .number-line-bar {
    padding: 4px 44px 4px 48px;
  }
  .number-line {
    padding: 4px 20px 4px 40px;
  }
`;
const StyledButton = styled.button`
  font-size: 16px;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const NumberLineToolModal: React.FC = () => {
  const [intervalStart, setIntervalStart] = useState<number | undefined>();
  const [intervalEnd, setIntervalEnd] = useState<number | undefined>();

  const [baseDominator, setBaseDominator] = useState<number | undefined>();
  const [numerator, setNumerator] = useState<number | undefined>();
  const [dominator, setDominator] = useState<number | undefined>();

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
    <ToolModal title="數線工具" type="number-line-tool">
      <StyledNumberLineToolContentDiv>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="d-flex align-items-center mb-2">
              <span className="label mr-2">數值區間</span>
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
              <span className="mx-2">至</span>
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
              <span className="label mr-4">切割數</span>
              <NumberSelect
                defaultValue={4}
                startIndex={1}
                value={baseDominator}
                onChange={setBaseDominator}
              />
            </div>
            <div className="d-flex align-items-center">
              <span className="label mr-4">分數</span>
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
            <span className="ml-2">復原</span>
          </StyledButton>
        </div>
      </StyledNumberLineToolContentDiv>

      <StyledImageWrapper className="pt-2">
        {numberLinePreviewBarImgSrc && (
          <img className="number-line-bar" src={numberLinePreviewBarImgSrc} alt="" />
        )}
        {numberLinePreviewImgSrc && (
          <img className="number-line" src={numberLinePreviewImgSrc} alt="" />
        )}
      </StyledImageWrapper>
    </ToolModal>
  );
};

export default NumberLineToolModal;
