import React from "react";
import styles from "../../styles/CommentOptionsCard.module.css";

export const CommentOptionsCard = ({
  deleteComment,
  toggleEdit,
  position,
  activeInputId,
}) => {
  return (
    <div
      className={styles.mainContainer}
      name="comment-options-container"
      style={{
        transform: `translate(${position.x}px,${position.y}px)translate(-50%, -100%)`,
      }}
    >
      <div
        className={styles.optionsContainer}
        role="button"
        onClick={() => toggleEdit(activeInputId)}
      >
        Edit
      </div>
      <div
        className={styles.optionsContainer}
        role="button"
        onClick={() => deleteComment()}
      >
        Delete
      </div>
    </div>
  );
};
