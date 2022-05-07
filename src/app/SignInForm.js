import React from "react";
import { auth, db, provider } from "../firebase";
import { signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, setDoc } from "firebase/firestore";
import { useGetUsersQuery } from "../features/api/apiSlice";

export const SignInForm = () => {
  const { data: users, isError } = useGetUsersQuery();
  const navigate = useNavigate();

  const googleSignIn = async (e) => {
    try {
      e.preventDefault();
      await signInWithRedirect(auth, provider);
      const user = auth.currentUser;
      if (!users.includes(user.id)) {
        await setDoc(collection(db, "users", `${user.uid}`), {
          name: user.displayName,
          photo: user.photoURL,
        });
      }
      // send user to homepage with `navigate`
      navigate("/newsfeed");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form>
      <button type="button" onClick={e => googleSignIn(e)}>
        Sign-In With Google
      </button>
    </form>
  );
};
