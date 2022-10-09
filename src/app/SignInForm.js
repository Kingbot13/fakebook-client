import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery, useAddUserMutation } from "../features/api/apiSlice";
import styles from "../styles/SignInForm.module.css";
import { SubmitBtn } from "../components/Button";
import ReactFacebookLogin from "react-facebook-login";

export const SignInForm = () => {
  const { data: users, isError } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();

  // const checkAndAddUser = async () => {
  //   try {
  //     const user = auth.currentUser;
  //     if (!users || !users.find((item) => item.id === user.id))
  //       await addUser({
  //         name: user.displayName,
  //         photo: user.photoURL,
  //         id: user.uid,
  //       }).unwrap();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       if (result) {
  //         checkAndAddUser();
  //         navigate("/newsfeed");
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);
  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <form className={styles.form}>
      {/*       <SubmitBtn type="button" onClick={(e) => googleSignIn(e)}>
        Sign-In With Google
      </SubmitBtn> */}
      <ReactFacebookLogin
        appId="851722429326075"
        autoLoad={true}
        fields="name, email, picture"
        callback={responseFacebook}
      />
    </form>
  );
};
