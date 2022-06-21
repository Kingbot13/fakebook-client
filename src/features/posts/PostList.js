import React, { useEffect } from "react";
import { Post } from "./Post";
import { useGetPostsQuery } from "../api/apiSlice";
import styles from "../../styles/PostList.module.css";

export const PostList = () => {
  const { data: posts, isError } = useGetPostsQuery();

  let sortedPosts;
  if (posts) sortedPosts = [...posts];
  useEffect(() => {
    if (posts && posts.length > 1) {
      console.log(posts);
      sortedPosts.sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
    }
  }, [posts]);

  return (
    <div className={styles.container}>
      {posts
        ? sortedPosts.map((post) => (
            <Post
              key={post.id}
              name={post.data.name}
              content={post.data.content}
              photo={post.data.photo}
              date={post.data.date}
              id={post.id}
              reactions={post.data.reactions}
              comments={post.data.comments}
            />
          ))
        : "Be the first to write a post!"}
    </div>
  );
};
