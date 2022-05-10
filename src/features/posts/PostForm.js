import React, { useState } from "react";
import { UserPhoto } from "../users/UserPhoto";

export const PostForm = ({ toggle, content, handleSubmit, handleChange }) => {
  return (
    <form>
      <div>
        <h2>Create post</h2>
        <button type="button" onClick={toggle}>
          X
        </button>
      </div>
      <div>
        <div>
          <UserPhoto />
        </div>
        <div>user name here friend dropdown list here</div>
      </div>
      <textarea
        placeholder="What's on your mind?"
        onChange={(e) => handleChange(e)}
        value={content}
      ></textarea>
      <div></div>
      <div>
        <div>Add to your post</div>
        <div>icons</div>
      </div>
      <button name="post-submit" type="button" onClick={(e) => handleSubmit(e)}>
        Post
      </button>
    </form>
  );
};
