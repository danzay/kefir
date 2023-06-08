/** The component displays a toggle button. */

import React, { useState } from "react";

interface IToggleButtonProps {
    onIcon?: string;
    offIcon?: string;
    onClick?: ( isSelected: boolean ) => void;
}

export const ToggleButton = ( { onIcon, offIcon, onClick }: IToggleButtonProps ) => {
    const [ isSelected, setSelected ] = useState( false );

    return (
        <img
            alt = "toggle-button"
            src = { isSelected ? onIcon : offIcon }
            onClick = { () => {
                setSelected( ( state ) => !state );
                onClick && onClick( !isSelected );
            } }
        />
    );
};
