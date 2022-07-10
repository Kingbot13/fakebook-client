import React from "react";
import { UserPhoto } from "../users/UserPhoto";
import styles from "../../styles/CommentInput.module.css";

export const CommentInput = ({ onClick, value, onChange, onFocus }) => {
  return (
    <div className={styles.container}>
      <div className={styles.photoContainer}>
        <UserPhoto />
      </div>
      <input
        name="comment-input"
        type="text"
        onFocus={(e) => onFocus(e)}
        // onClick={() => onClick()}
        onChange={(e) => onChange(e)}
        value={value}
        placeholder="Write a comment..."
      />
    </div>
  );
};
