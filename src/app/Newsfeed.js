import React, {useState} from "react";
import { PostFormButton } from "../features/posts/PostFormButton";
import { PostForm } from "../features/posts/PostForm";

export const Newsfeed = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm ? true : false);
  }
  return (
    <main>
      {showForm && <PostForm />}
      <PostFormButton onClick={toggleForm} />
    </main>
  );
};
