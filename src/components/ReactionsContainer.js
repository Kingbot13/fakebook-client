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
    bottom: 0;
    right: 0;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`