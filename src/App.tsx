import React from "react";
import { Provider } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";

import "./i18n";
import { dark } from "./themes/";
import { Comments } from "./pages/";
import { mainStore } from "./stores/";
import "react-toastify/dist/ReactToastify.css";

const AppStyle = styled.div`
  height: 100vh;
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: ${ ( props ) => props.theme.colors.text };
  background: no-repeat center black url(${ ( props ) => props.theme.colors.bgImg });
  background-size: cover;
`;

function App() {
    const theme = { colors: dark };

    return (
        <Provider store = { mainStore }>
            <ThemeProvider theme = { theme }>
                <AppStyle>
                    <Comments />
                    <ToastContainer theme = "dark" />
                </AppStyle>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
