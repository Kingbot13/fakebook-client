import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

import { PostFormButton } from "../features/posts/PostFormButton";
import { PostForm } from "../features/posts/PostForm";
import { PostList } from "../features/posts/PostList";

export const Newsfeed = () => {
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleChange = (e) => setContent(e.target.value);

  const getUserInfo = () => {
    const user = auth.currentUser;

    if (user) {
      setName(user.displayName);
      setId(user.uid);
    } else {
      throw new Error("user is not signed in");
    }
  };

  const handleSubmit = async (e) => {
    try {
      getUserInfo();
      e.preventDefault();
      await addDoc(collection(db, "posts"), {
        name: name,
        userId: id,
        content: content,
      });
      setContent("");
      toggleForm();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm ? true : false);
    if (content) setContent("");
  };
  return (
    <main>
      {showForm && (
        <PostForm
          toggle={toggleForm}
          content={content}
          setContent={setContent}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      <PostFormButton onClick={toggleForm} />
      <PostList />
    </main>
  );
};
