import React from "react";

export const CommentOptionsCard = ({deleteComment }) => {
    return (
        <div>
            <div>Edit</div>
            <div role='button' onClick={() => deleteComment()}>Delete</div>
        </div>
    )
}