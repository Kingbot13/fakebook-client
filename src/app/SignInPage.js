import React, {useEffect} from "react";
import { SignInForm } from "./SignInForm";
import styles from '../styles/SignInPage.module.css';
import { useNavigate } from "react-router-dom";

export const SignInPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/newsfeed');
  },[]);
  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.h1}>fakebook</h1>
        <h2 className={styles.h2}>Connect with friends and the world around you on Fakebook.</h2>
      </div>
      <SignInForm />
    </main>
  );
};
