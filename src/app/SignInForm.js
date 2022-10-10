import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery, useAddUserMutation } from "../features/api/apiSlice";
import styles from "../styles/SignInForm.module.css";
import { SubmitBtn } from "../components/Button";
import ReactFacebookLogin from "react-facebook-login";

export const SignInForm = () => {
  const storage = localStorage;
  const navigate = useNavigate();

  const responseFacebook = (response) => {
    console.log(response);
    if (response) {
      storage.setItem("token", response.accessToken);
      navigate('/newsfeed');
    }
  };

  return (
    <form className={styles.form}>
      <ReactFacebookLogin
        appId="851722429326075"
        autoLoad={true}
        fields="name, email, picture"
        callback={responseFacebook}
      />
    </form>
  );
};
