import styled from "styled-components";

export const StyledToolContentDiv = styled.div`
  background-color: #c4c4c4;
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
`;
export const StyledDividerLineDiv = styled.div`
  border-bottom: 1px solid #000000;
  width: 80px;
  margin: 4px 0;
`;
export const StyledModalPreviewImageWrapper = styled.div`
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
`;
export const StyledButton = styled.button`
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
