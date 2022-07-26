import React from "react";
import styled from "styled-components";

const ReactionsContainer = ({reactions, className}) => {
    return (
        <div className={className}>
            <div>
                {reactions.length}
            </div>
        </div>
    )
}

export const StyledReactions = styled(ReactionsContainer)`
    position: absolute;
    bottom: -4px;
    right: -4px;
    background-color: #fff;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    font-size: .6875rem;
    padding: 2px;
    height: 18px;
    width: 18px;
`