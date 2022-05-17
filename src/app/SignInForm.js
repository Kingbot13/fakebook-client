import React, { useEffect } from "react";
import { auth, db, provider } from "../firebase";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useGetUsersQuery, useAddUserMutation } from "../features/api/apiSlice";


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

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        console.log(result);
        if (result) {
          const user = auth.currentUser;
          addUser({name: user.displayName, photo: user.photoURL, id: user.uid});
          // addUser(user);
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
