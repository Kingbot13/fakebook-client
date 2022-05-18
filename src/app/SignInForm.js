import React, { useEffect } from "react";
import { auth, db, provider } from "../firebase";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useGetUsersQuery, useAddUserMutation } from "../features/api/apiSlice";
import styles from "../styles/SignInForm.module.css";

export const SignInForm = () => {
  const { data: users, isError } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();

  const googleSignIn = async (e) => {
    try {
      e.preventDefault();
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  // const addUser = async (user) => {
  //   if (!users.find((item) => item.id === user.id) || !users) {
  //     await setDoc(doc(db, "users", `${user.uid}`), {
  //       name: user.displayName,
  //       photo: user.photoURL,
  //     });
  //   }
  // };

  const checkAndAddUser = async () => {
    try {
      const user = auth.currentUser;
      if (!users.find((item) => item.id === user.id) || !users)
        await addUser({
          name: user.displayName,
          photo: user.photoURL,
          id: user.uid,
        }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        console.log(result);
        if (result) {
          checkAndAddUser();
          navigate("/newsfeed");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <form>
      <button type="button" onClick={(e) => googleSignIn(e)}>
        Sign-In With Google
      </button>
    </form>
  );
};
