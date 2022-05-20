import React from "react";
import { StyledImg } from "../../components/Image";
import styles from '../../styles/Post.module.css';

export const Post = ({ name, content, photo }) => {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <StyledImg src={photo} alt="" />
        </div>
        <div>{name}</div>
        <div>...</div>
      </div>
      <p>{content}</p>
    </div>
  );
};
