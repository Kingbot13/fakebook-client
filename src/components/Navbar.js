import React from "react";
import styled from 'styled-components';
import { StyledLogo } from "./Logo";


const Navbar = ({className}) => {
    return (
        <nav className={className}>
            <StyledLogo />
            <div>link placeholder</div>
        </nav>
    )
}

export const StyledNav = styled(Navbar)`
    background-color: #fff;
    height: 56px;
    display: flex;
    justify-content: center;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    position: fixed;
    width: 100%;
    margin: auto;
`