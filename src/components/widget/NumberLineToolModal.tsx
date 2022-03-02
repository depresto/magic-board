import React from "react";
import styled from "styled-components";
import ToolModal from "../common/ToolModal";
import NumberSelect from "../input/NumberSelect";

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
  return (
    <ToolModal title="數線工具">
      <StyledNumberLineToolContentDiv>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="d-flex align-items-center mb-2">
              <span className="label mr-2">數值區間</span>
              <NumberSelect defaultValue={0} />
              <span className="mx-2">至</span>
              <NumberSelect defaultValue={1} />
            </div>
            <div className="d-flex align-items-center mb-2">
              <span className="label mr-2">切割參考線</span>
              <div className="d-flex flex-column align-items-center">
                <span>1</span>
                <StyledDividerLineDiv />
                <NumberSelect defaultValue={4} />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <span className="label mr-4">等值分數</span>
              <div className="d-flex flex-column align-items-center">
                <NumberSelect defaultValue={1} />
                <StyledDividerLineDiv />
                <NumberSelect defaultValue={2} />
              </div>
            </div>
          </div>

          <div>復原</div>
        </div>
      </StyledNumberLineToolContentDiv>
    </ToolModal>
  );
};

export default NumberLineToolModal;
