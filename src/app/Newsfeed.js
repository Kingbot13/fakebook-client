import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import styles from "../styles/Newsfeed.module.css";
import { PostFormButton } from "../features/posts/PostFormButton";
import { PostForm } from "../features/posts/PostForm";
import { PostList } from "../features/posts/PostList";
import { useAddPostMutation } from "../features/api/apiSlice";

export const Newsfeed = () => {
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [addPost] = useAddPostMutation();

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

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      getUserInfo();
      const photo = auth.currentUser.photoURL;
      await addPost({ name, content, photo, id, date: Date() }).unwrap();
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
    <main className={styles.main}>
      {showForm && (
        <PostForm
          toggle={toggleForm}
          content={content}
          setContent={setContent}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          title='Create Post'
        />
      )}
      <PostFormButton onClick={toggleForm} />
      <PostList />
    </main>
  );
};
