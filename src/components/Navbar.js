import React from "react";
import styled from 'styled-components';


const Navbar = ({className}) => {
    return (
        <nav className={className}>
            <div>link placeholder</div>
        </nav>
    )
}

export const StyledNav = styled(Navbar)`
    background-color: blue;
`