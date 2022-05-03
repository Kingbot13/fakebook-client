import React, {useState} from "react";
import { PostFormButton } from "../features/posts/PostFormButton";

export const Newsfeed = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm ? true : false);
  }
  return (
    <main>
      <PostFormButton onClick={toggleForm} />
    </main>
  );
};
