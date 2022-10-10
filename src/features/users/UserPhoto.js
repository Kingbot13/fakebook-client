import React, { useEffect, useState } from "react";
import styles from "../../styles/UserPhoto.module.css";
import { useGetCurrentUserQuery } from "../api/apiSlice";

export const UserPhoto = () => {
  const [photoURL, setPhotoURL] = useState("");
  const {data: user, isError} = useGetCurrentUserQuery();

  useEffect(() => {
    if (isError) {
      throw new Error('User not found');
    }
    setPhotoURL(user.profileImage);
  }, []);

  return (
    <img className={styles.img} src={photoURL} alt="" name="profile-img" />
  );
};
