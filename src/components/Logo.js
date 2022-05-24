import React from "react";
import styled from 'styled-components';

const Logo = ({className}) => {
    return(
        <svg className={className} viewBox="0, 0, 36, 36" height='40px' width='40px'>
            <circle r='13' fill='blue'/>
            <text x='0' y='0' fill='white'>f</text>
        </svg>
    )
}

export const StyledLogo = styled(Logo)`
    & text {
        font-size: 20px;
    }
`