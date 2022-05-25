import React from "react";
import styled from 'styled-components';

const Logo = ({className}) => {
    return(
        <svg className={className} viewBox="0, 0, 36, 36" height='40px' width='40px'>
            <defs>
                <linearGradient x1="50%" x2="50%" y1="97.0782153%" y2="0%" id="grad1">
                    <stop offset="0%" stop-color="#0062E0"></stop>
                    <stop offset="100%" stop-color="#19AFFF"></stop>
                </linearGradient>
            </defs>
            <circle cx='18' cy='18' r='17' fill='url(#grad1)'/>
            <text x='11' y='36' fill='white'>f</text>
        </svg>
    )
}

export const StyledLogo = styled(Logo)`
    & text {
        font-size: 35px;
        font-weight: 700;
    }
    position: fixed;
    left: 0;
    top: 6px;
    margin-left: 16px;
`