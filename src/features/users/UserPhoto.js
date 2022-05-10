import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { useGetUsersQuery } from "../api/apiSlice";

export const UserPhoto = () => {
  const user = auth.currentUser;
  //   const { data: users } = useGetUsersQuery();
  //   const currentUser = users.find((item) => item.id === user.id);

  return <img src={user.photoURL} alt="" />;
};
