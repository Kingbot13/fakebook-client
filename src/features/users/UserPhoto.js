import React from "react";
import { auth } from "../../firebase";

export const UserPhoto = () => {
  const user = auth.currentUser;

  return <img src={user.photoURL} alt="" />;
};
