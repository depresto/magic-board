import React from "react";
import Layout from "./components/common/Layout";
import NumberLineToolModal from "./components/widget/NumberLineToolModal";
import { AppSizingProvider } from "./context/AppSizingContext";
import { CustomThemeProvider } from "./context/CustomThemeContext";

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <AppSizingProvider>
        <Layout>
          <NumberLineToolModal />
        </Layout>
      </AppSizingProvider>
    </CustomThemeProvider>
  );
};

export default App;
