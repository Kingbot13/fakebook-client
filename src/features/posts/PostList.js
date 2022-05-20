import React from "react";
import { Post } from "./Post";
import { useGetPostsQuery } from "../api/apiSlice";
import styles from '../../styles/PostList.module.css';

export const PostList = () => {
  const {data: posts} = useGetPostsQuery();

  

  return (
    <div className={styles.container}>
      {posts ? posts.map(post => <Post key={post.id} name={post.data.name} content={post.data.content} photo={post.data.photo} />)
      :
      "Be the first to write a post!"}
    </div>
  );
};
