import React from "react";

export const PostOptionsCard = ({toggleForm, deletePost}) => {
    return (
        <div>
            <div role='button' onClick={() => toggleForm()}>Edit post</div>
            <div role='button' onClick={() => deletePost()}>Delete post</div>
        </div>
    )
}