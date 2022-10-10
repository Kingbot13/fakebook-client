import React, { useEffect, useState } from "react";
import styles from "../../styles/UserPhoto.module.css";

export const UserPhoto = () => {
  const [photoURL, setPhotoURL] = useState("");
  const user = null;

  useEffect(() => {
    setPhotoURL(user.photoURL || null);
  }, []);

  return (
    <img className={styles.img} src={photoURL} alt="" name="profile-img" />
  );
};
