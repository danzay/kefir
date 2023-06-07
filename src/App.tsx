import React from "react";
import { Provider } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";

import "./i18n";
import { Comments } from "./pages/";
import { mainStore } from "./stores/";
import backgroundImage from "./assets/background.png";
import "react-toastify/dist/ReactToastify.css";
import { dark } from "./themes";

const AppStyle = styled.div`
  background: no-repeat center black url(${ backgroundImage });
  background-size: cover;
  height: 100vh;
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: ${ ( props ) => props.theme.colors.text };
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
