/** The component displays an icon. */

import styled from "styled-components";
import { SIZE_VALUES } from "../../constants/";
import { elementSizeType } from "../../models/";

interface IconProps {
    size?: elementSizeType;
}

export const Icon = styled.img<IconProps>`
  width: ${ ( props ) => SIZE_VALUES[ props.size || "s" ] }px;;
  height: ${ ( props ) => SIZE_VALUES[ props.size || "s" ] }px;;
`;
