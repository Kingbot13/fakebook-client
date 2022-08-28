import React from "react";
import { UserPhoto } from "../users/UserPhoto";
import styles from "../../styles/CommentInput.module.css";

export const CommentInput = ({
  value,
  onChange,
  onFocus,
  isReply,
  idForReply,
  id,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.photoContainer}>
        <UserPhoto />
      </div>
      <input
        name="comment-input"
        type="text"
        onKeyDown={(e) => onFocus(e, value, isReply, idForReply)}
        onChange={(e) => onChange(e)}
        value={value}
        placeholder="Write a comment..."
        data-id={id}
      />
    </div>
  );
};
