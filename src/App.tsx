import React from "react";
import styled from "styled-components";
import Layout from "./components/common/Layout";
import NumberLineToolModal from "./components/toolbox/NumberLineToolModal";
import { AppSizingProvider } from "./context/AppSizingContext";
import { CustomThemeProvider } from "./context/CustomThemeContext";

const StyledMainCanvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <AppSizingProvider>
        <Layout>
          <StyledMainCanvas id="canvas" />
          <NumberLineToolModal />
        </Layout>
      </AppSizingProvider>
    </CustomThemeProvider>
  );
};

export default App;
