import React from "react";
import { auth } from "../../firebase";
import styles from '../../styles/UserPhoto.module.css';

export const UserPhoto = () => {
  const user = auth.currentUser;

  return <img className={styles.img} src={user.photoURL} alt="" />;
};
