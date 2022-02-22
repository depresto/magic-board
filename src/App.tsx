import React from "react";
import Layout from "./components/common/Layout";
import ToolModal from "./components/common/ToolModal";
import { AppSizingProvider } from "./context/AppSizingContext";
import { CustomThemeProvider } from "./context/CustomThemeContext";

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <AppSizingProvider>
        <Layout>
          <ToolModal title="元件庫"></ToolModal>
        </Layout>
      </AppSizingProvider>
    </CustomThemeProvider>
  );
};

export default App;
