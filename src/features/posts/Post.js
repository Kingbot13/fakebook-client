import React from "react";
import { StyledImg } from "../../components/Image";
import styles from '../../styles/Post.module.css';

export const Post = ({ name, content, photo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div>
          <StyledImg src={photo} alt="" />
        </div>
        <div><strong>{name}</strong></div>
        <div>...</div>
      </div>
      <p>{content}</p>
    </div>
  );
};
