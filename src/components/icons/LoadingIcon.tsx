/** The component displays a loading icon. */

import React from "react";
import styled, { keyframes } from "styled-components";
import loadingIcon from "../../assets/icons/loading.svg";
import { Icon } from "./Icon";

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const IconStyle = styled( Icon )`
  animation: ${ rotation } 2s infinite linear;

  svg {
    fill: white;
  }
`;

export const LoadingIcon = () => {
    return (
        <IconStyle size = "m" src = { loadingIcon } />
    );
};
