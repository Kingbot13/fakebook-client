import React from "react";
import { auth, db, provider } from "../firebase";
import { signInWithRedirect } from "firebase/auth";
import { useNavigate as navigate } from "react-router-dom";
import { collection, setDoc } from "firebase/firestore";

export const SignInForm = () => {
  const googleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider);
      const user = auth.currentUser;
      await setDoc(collection(db, "users", `${user.uid}`), {
        name: user.displayName,
        photo: user.photoURL,
      });
      // send user to homepage with `navigate`
      navigate("newsfeed");
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
