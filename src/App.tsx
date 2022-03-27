import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Layout from "./components/common/Layout";
import MainCanvas from "./components/common/MainCanvas";
import ToolboxLoader from "./components/toolbox/ToolboxLoader";
import { AppSizingProvider } from "./context/AppSizingContext";
import { CustomThemeProvider } from "./context/CustomThemeContext";
import { ToolboxProvider } from "./context/ToolboxContext";

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <AppSizingProvider>
        <ToolboxProvider>
          <DndProvider backend={HTML5Backend}>
            <Layout>
              <MainCanvas />
              <ToolboxLoader />
            </Layout>
          </DndProvider>
        </ToolboxProvider>
      </AppSizingProvider>
    </CustomThemeProvider>
  );
};

export default App;
