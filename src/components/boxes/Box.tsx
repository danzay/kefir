import styled from "styled-components";

interface IBoxProps {
    padding?: string;
    margin?: string;
    flex?: number;
    overflow?: any;
}

export const Box = styled.div<IBoxProps>`
  padding: ${ ( props ) => props.padding };
  margin: ${ ( props ) => props.margin };
  flex: ${ ( props ) => props.flex };
  overflow: ${ ( props ) => props.overflow };
`;
