import React from "react";
import { StyledImg } from "./Image";
import styles from "../styles/UpperPost.module.css";
export const UpperPost = ({
  name,
  photo,
  formattedDate,
  toggleOptionsCard,
  content,
  share,
  shareId,
  filteredPost,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div>
          <StyledImg src={photo} alt="" />
        </div>
        <div className={styles.nameContainer}>
          <strong>{name}</strong>
          <div className={styles.time}>{formattedDate}</div>
        </div>
        <div
          role="button"
          onClick={toggleOptionsCard}
          className={styles.options}
        >
          ...
        </div>
      </div>
      <p className={styles.content}>{content}</p>
      {share && (
        <div>
          <UpperPost
            name={filteredPost.data.name}
            content={filteredPost.data.content}
            photo={filteredPost.data.photo}
            date={filteredPost.data.date}
            id={shareId}
          />
        </div>
      )}
    </div>
  );
};
