import React from "react";
import styles from '../../styles/PostOptionsCard.module.css';

export const PostOptionsCard = ({toggleForm, deletePost}) => {
    return (
        <div className={styles.main}>
            <div role='button' onClick={() => toggleForm()}>Edit post</div>
            <div role='button' onClick={() => deletePost()}>Delete post</div>
        </div>
    )
}