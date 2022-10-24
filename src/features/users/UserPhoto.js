import React, { useEffect, useState } from "react";
import styles from "../../styles/UserPhoto.module.css";
import { useGetCurrentUserQuery } from "../api/apiSlice";

export const UserPhoto = () => {
  const { data: user, isError, isSuccess } = useGetCurrentUserQuery();
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (isError) {
      throw new Error("User not found");
    }
    if (user) {
      setPhotoURL(user.user.profileImage);
    }
  }, [user, isSuccess]);

  return (
    <img className={styles.img} src={photoURL} alt="" name="profile-img" />
  );
};
