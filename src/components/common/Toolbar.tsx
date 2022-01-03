import React from "react";
import styled from "styled-components";
import { ReactComponent as MenuIconSvg } from "../../assets/images/icon/menu.svg";

const StyledToolbar = styled.div`
  height: var(--toolbar-height);
  width: 100%;
  background-color: var(--toolbar-background);
`;
const Toolbar: React.FC = () => {
  return (
    <StyledToolbar className="d-flex px-3 py-3">
      <div>
        <MenuButton />
      </div>
      <div></div>
    </StyledToolbar>
  );
};

const StyledMenuButton = styled.div`
  position: relative;
  background-color: var(--secondary-color);
  border-radius: 10px;
  cursor: pointer;

  .text-tag {
    width: 100px;
    text-align: center;
  }
`;
const MenuButton: React.FC = () => {
  return (
    <StyledMenuButton className="d-flex justify-content-between py-2 px-2">
      <MenuIconSvg />
      <span className="text-tag">分數</span>
    </StyledMenuButton>
  );
};

export default Toolbar;
