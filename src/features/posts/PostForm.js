import { addDoc, collection } from "firebase/firestore";
import React, {useState} from "react";
import { auth, db } from "../../firebase";

export const PostForm = () => {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const handleChange = e => setContent(e.target.value);

  const getUserInfo = () => {
    const user = auth.currentUser;

    if (user) {
      setName(user.displayName);
      setId(user.uid);
    } else {
      throw new Error('user is not signed in');
    }

  }

  const handleSubmit = async (e) => {
    try {
      getUserInfo();
      e.preventDefault();
      await addDoc(collection(db, "posts"), {
        name: name,
        userId: id,
        content: content
      });

    } catch(err) {
      console.error(err);
    }
  }

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
      <button type="button" onClick={e => handleSubmit(e)} >Post</button>
    </form>
  );
};
