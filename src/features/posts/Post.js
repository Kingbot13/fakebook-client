import { formatDistanceToNow } from "date-fns";
import React from "react";
import { StyledImg } from "../../components/Image";
import styles from '../../styles/Post.module.css';

export const Post = ({ name, content, photo, date }) => {
  const formattedDate = formatDistanceToNow(new Date(date));
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
        <div className={styles.options}>...</div>
      </div>
      <p className={styles.content}>{content}</p>
      <div>
        <div className={styles.displayedReactions}>reactions div</div>
        <div className={styles.reactionContainer} >
          <div className={styles.secondaryContainer}>
            <div className={styles.likeContainer}>
              <i className={styles.likeButton}></i>
            </div>
            <div className={styles.likeContainer}>
              Like 
            </div>
          </div>
          <div className={styles.secondaryContainer}>comment</div>
          <div className={styles.secondaryContainer}>Share</div>
        </div>
      </div>
    </div>
  );
};
