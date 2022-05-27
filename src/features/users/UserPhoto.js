import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import styles from '../../styles/UserPhoto.module.css';

export const UserPhoto = () => {
  const [photoURL, setPhotoURL] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    setPhotoURL(user.photoURL);
  }, []);

  return <img className={styles.img} src={photoURL} alt="" />;
};
