import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Layout from "./components/common/Layout";
import MainCanvas from "./components/common/MainCanvas";
import NumberLineToolModal from "./components/toolbox/NumberLineToolModal";
import { AppSizingProvider } from "./context/AppSizingContext";
import { CustomThemeProvider } from "./context/CustomThemeContext";

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <AppSizingProvider>
        <DndProvider backend={HTML5Backend}>
          <Layout>
            <MainCanvas />
            <NumberLineToolModal />
          </Layout>
        </DndProvider>
      </AppSizingProvider>
    </CustomThemeProvider>
  );
};

export default App;
