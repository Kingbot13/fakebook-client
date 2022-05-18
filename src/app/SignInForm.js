import React, { useEffect } from "react";
import { auth, provider } from "../firebase";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery, useAddUserMutation } from "../features/api/apiSlice";
import styles from "../styles/SignInForm.module.css";
import { SubmitBtn } from "../components/Button";

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
    <form className={styles.form}>
      <SubmitBtn type="button" onClick={(e) => googleSignIn(e)}>
        Sign-In With Google
      </SubmitBtn>
    </form>
  );
};
