/** The component displays a button. */

import styled from "styled-components";

interface IButtonProps {
    width?: number;
    height?: number;
    padding?: string;
    margin?: string;
}

export const Button = styled.button<IButtonProps>`
  border-radius: 4px;
  border: none;
  cursor: pointer;

  width: ${ ( props ) => props.width }px;
  height: ${ ( props ) => props.height }px;
  padding: ${ ( props ) => props.padding };
  margin: ${ ( props ) => props.margin };
  background-color: ${ ( props ) => props.theme.colors.button };
  color: ${ ( props ) => props.theme.colors.text };
`;