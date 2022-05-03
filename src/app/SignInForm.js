import React from "react";
import { auth, provider } from "../firebase";
import { signInWithRedirect } from "firebase/auth";
import { useNavigate as navigate } from "react-router-dom";

export const SignInForm = () => {
  const googleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider);
      // send user to homepage with `navigate`
      navigate('newsfeed');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form>
      <button type="button" onClick={googleSignIn}>
        Sign-In With Google
      </button>
    </form>
  );
};
