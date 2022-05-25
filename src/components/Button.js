import styled from "styled-components"

export const SubmitBtn = styled.button`
    background-color: #1B74E4;
    color: #fff;
    border: none;
    height: 36px;
    border-radius: 6px;
    width: 100%;
    margin: 16px 16px 0;
    font-weight: 600;
    font-size: 0.9375rem;
    &:hover {
        background-color: #196cd5;
        color: #f7f7f7;
    }
    transition: background-color 0.5s, color 0.5s;
`

export const UserOptionsBtn = styled.button`
    border-radius: 50%;
    border: none;
    background-color: var(--secondary-btn-color);
    height: 40px;
    width: 40px;
`