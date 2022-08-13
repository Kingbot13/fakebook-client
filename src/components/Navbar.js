import React from "react";
import styled from "styled-components";
import { StyledLogo } from "./Logo";
import { UserOptionsBtn } from "./Button";

const Navbar = ({ className, toggleCard }) => {
  return (
    <nav className={className}>
      <StyledLogo />
      <div>link placeholder</div>
      <div className="option-btns-container">
        <UserOptionsBtn onClick={() => toggleCard()}>Options</UserOptionsBtn>
      </div>
    </nav>
  );
};

export const StyledNav = styled(Navbar)`
  background-color: #fff;
  height: 56px;
  display: flex;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  margin: auto;
  z-index: 1;
  & .option-btns-container {
    position: fixed;
    right: 0;
    top: 0;
    margin-right: 16px;
    height: 56px;
    display: flex;
    align-items: center;
  }
`;
