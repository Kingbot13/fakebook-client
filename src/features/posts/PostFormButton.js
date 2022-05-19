import React from "react";
import { UserPhoto } from "../users/UserPhoto";
import styles from '../../styles/PostFormButton.module.css';

export const PostFormButton = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <UserPhoto />
      <button name="toggle-form" type="button" onClick={() => onClick()}>
        What's on your mind?
      </button>
    </div>
  );
};
