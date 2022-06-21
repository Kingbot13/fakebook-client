import React from "react";

export const PostOptionsCard = ({toggleForm}) => {
    return (
        <div>
            <div role='button' onClick={() => toggleForm()}>Edit post</div>
            <div role='button'>Delete post</div>
        </div>
    )
}