import React, {useState} from "react";

export const PostForm = () => {
  const [content, setContent] = useState('');

  const handleChange = e => setContent(e.target.value);

  return (
    <form>
      <div>
        <h2>Create post</h2>
        <button type="button">X</button>
      </div>
      <div>
        <div>user pic here</div>
        <div>user name here friend dropdown list here</div>
      </div>
      <textarea placeholder="What's on your mind?" onChange={e => handleChange(e)} ></textarea>
      <div></div>
      <div>
        <div>Add to your post</div>
        <div>icons</div>
      </div>
      <button type="button">Post</button>
    </form>
  );
};
