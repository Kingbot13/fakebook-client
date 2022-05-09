import React, {useEffect} from "react";
import { auth, db, provider } from "../firebase";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, setDoc } from "firebase/firestore";
import { useGetUsersQuery } from "../features/api/apiSlice";

export const SignInForm = () => {
  const { data: users, isError } = useGetUsersQuery();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const googleSignIn = async (e) => {
    try {
      e.preventDefault();
      await signInWithRedirect(auth, provider);
      if (!users.includes(user.id)) {
        
      }
      // send user to homepage with `navigate`
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
    .then((result) => {
      console.log(result);
      addUser();
      navigate('/newsfeed');
    })
    .catch((err) => {
      console.error(err);
    });
    
  },[]);

  const addUser = async () => {
    await setDoc(collection(db, "users", `${user.uid}`), {
      name: user.displayName,
      photo: user.photoURL,
    });
  }

  return (
    <form>
      <button type="button" onClick={e => googleSignIn(e)}>
        Sign-In With Google
      </button>
    </form>
  );
};
