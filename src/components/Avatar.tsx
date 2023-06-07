/** The component displays an avatar. */

import React from "react";
import styled from "styled-components";

interface IAvatarProps {
    src: string;
}

const AvatarStyle = styled.img`
  object-fit: cover;
  border-radius: 50%;
  min-width: 68px;
`;

export const Avatar = ( { src }: IAvatarProps ) => {
    return (
        <AvatarStyle
            src = { src }
            alt = "avatar"
            width = { 68 }
            height = { 68 }
        />
    );
}
