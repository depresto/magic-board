import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import ToolModal from "../common/ToolModal";
import NumberSelect from "../input/NumberSelect";
import NumberLineTool from "../widget/NumberLineTool";

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
const StyledCanvasWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
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

const defaultIntervalStart = 0;
const defaultIntervalEnd = 1;
const defaultBaseDominator = 4;
const defaultNumerator = 1;
const defaultDominator = 2;

const NumberLineToolModal: React.FC = () => {
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

  const [intervalStart, setIntervalStart] = useState(defaultIntervalStart);
  const [intervalEnd, setIntervalEnd] = useState(defaultIntervalEnd);

  const [baseDominator, setBaseDominator] = useState(defaultBaseDominator);
  const [numerator, setNumerator] = useState(defaultNumerator);
  const [dominator, setDominator] = useState(defaultDominator);

  const onModalResize = () => {
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

  const onReset = () => {
    setIntervalStart(defaultIntervalStart);
    setIntervalEnd(defaultIntervalEnd);
    setBaseDominator(defaultBaseDominator);
    setNumerator(defaultNumerator);
    setDominator(defaultDominator);
  };

  return (
    <ToolModal title="數線工具" onResize={onModalResize}>
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
                  if (intervalStart >= intervalEnd) {
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
                }}
              />
            </div>
            <div className="d-flex align-items-center mb-2">
              <span className="label mr-2">切割參考線</span>
              <div className="d-flex flex-column align-items-center">
                <span>1</span>
                <StyledDividerLineDiv />
                <NumberSelect
                  defaultValue={4}
                  startIndex={1}
                  value={baseDominator}
                  onChange={setBaseDominator}
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <span className="label mr-4">等值分數</span>
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

      <NumberLineTool
        canvas={canvas}
        intervalStart={intervalStart}
        intervalEnd={intervalEnd}
        baseDominator={baseDominator}
        numerator={numerator}
        dominator={dominator}
      />
      <StyledCanvasWrapper ref={setCanvasWrapperRef}>
        <canvas ref={setCanvasRef}></canvas>
      </StyledCanvasWrapper>
    </ToolModal>
  );
};

export default NumberLineToolModal;
