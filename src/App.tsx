import React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

import "./i18n";
import { Comments } from "./pages/";
import { mainStore } from "./stores/";
import backgroundImage from "./assets/background.png";
import "react-toastify/dist/ReactToastify.css";


const AppStyle = styled.div`
  background: no-repeat center black url(${ backgroundImage });
  height: 100vh;
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: white;
`;

function App() {
    return (
        <Provider store = { mainStore }>
            <AppStyle>
                <Comments />
                <ToastContainer />
            </AppStyle>
        </Provider>
    );
}

export default App;
