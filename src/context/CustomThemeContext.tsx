import React, { createContext, useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

type ThemeProps = { [key: string]: string };

const initialThemeProps = {
  "primary-color": "#FF0000",
  "secondary-color": "#9d9d9d",
  "text-color": "#000000",
  "widget-title-bar-background": "#C4C4C4",
  "widget-background": "#e5e5e5",
  "toolbar-background": "#C4C4C4",
};

export const CustomThemeContext = createContext<ThemeProps>(initialThemeProps);

const GlobalStyle = createGlobalStyle`
  :root {
    --app-height: 100%;
    --app-width: 100%;

    --toolbar-height: 72px;

    --primary-color: ${(props) => (props.theme as any)["primary-color"]};
    --secondary-color: ${(props) => (props.theme as any)["secondary-color"]};
    --text-color: ${(props) => (props.theme as any)["text-color"]};
    --widget-title-bar-background: ${(props) => (props.theme as any)["widget-title-bar-background"]};
    --widget-background: ${(props) => (props.theme as any)["widget-background"]};
    --toolbar-background: ${(props) => (props.theme as any)["toolbar-background"]};
  }
  html,
  body {
    height: 100vh;
    height: var(--app-height);
  }
  .full-height {
    height: 100%;
  }
`;

export const CustomThemeProvider: React.FC = ({ children }) => {
  useEffect(() => {
    const onWindowResize = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
      document.documentElement.style.setProperty(
        "--app-width",
        `${window.innerWidth}px`
      );

      setTimeout(() => {
        document.documentElement.style.setProperty(
          "--app-height",
          `${window.innerHeight}px`
        );
        document.documentElement.style.setProperty(
          "--app-width",
          `${window.innerWidth}px`
        );
      });
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", onWindowResize, false);
      window.addEventListener("orientationchange", onWindowResize, false);
      onWindowResize();
    }
    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("orientationchange", onWindowResize);
    };
  }, []);

  return (
    <ThemeProvider theme={initialThemeProps}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
