import React, { useState } from "react";
import styled from "styled-components";
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

const NumberLineToolModal: React.FC = () => {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [intervalStart, setIntervalStart] = useState(0);
  const [intervalEnd, setIntervalEnd] = useState(1);

  const [baseDominator, setBaseDominator] = useState(4);
  const [numerator, setNumerator] = useState(1);
  const [dominator, setDominator] = useState(2);

  return (
    <ToolModal title="數線工具">
      <StyledNumberLineToolContentDiv>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="d-flex align-items-center mb-2">
              <span className="label mr-2">數值區間</span>
              <NumberSelect
                defaultValue={0}
                value={intervalStart}
                onChange={setIntervalStart}
              />
              <span className="mx-2">至</span>
              <NumberSelect
                defaultValue={1}
                value={intervalEnd}
                onChange={setIntervalEnd}
              />
            </div>
            <div className="d-flex align-items-center mb-2">
              <span className="label mr-2">切割參考線</span>
              <div className="d-flex flex-column align-items-center">
                <span>1</span>
                <StyledDividerLineDiv />
                <NumberSelect
                  defaultValue={4}
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

          <div>復原</div>
        </div>
      </StyledNumberLineToolContentDiv>

      <NumberLineTool
        canvasRef={canvasRef}
        intervalStart={intervalStart}
        intervalEnd={intervalEnd}
        baseDominator={baseDominator}
        numerator={numerator}
        dominator={dominator}
      />
      <canvas ref={setCanvasRef}></canvas>
    </ToolModal>
  );
};

export default NumberLineToolModal;
