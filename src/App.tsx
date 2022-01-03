import React from "react";
import Layout from "./components/common/Layout";
import { CustomThemeProvider } from "./context/CustomThemeContext";

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <Layout></Layout>
    </CustomThemeProvider>
  );
};

export default App;
