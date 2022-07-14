import React from "react";
import styles from "../../styles/CommentOptionsCard.module.css";

export const CommentOptionsCard = ({ deleteComment, position }) => {
  return (
    <div
      className={styles.mainContainer}
      name="comment-options-container"
      style={{
        transform: `translate(${position.x}px,${position.y}px)translate(-50%, -100%)`,
      }}
    >
      <div>Edit</div>
      <div role="button" onClick={() => deleteComment()}>
        Delete
      </div>
    </div>
  );
};
