import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

const StyledLayout = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - var(--toolbar-height));
`;
const Layout: React.FC = ({ children }) => {
  return (
    <StyledLayout>
      <div className="d-flex full-height">
        <Sidebar />
        <div className="flex-grow-1 layout-content">{children}</div>
      </div>
      <Toolbar />
    </StyledLayout>
  );
};

export default Layout;
