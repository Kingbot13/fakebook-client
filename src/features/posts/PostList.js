import React, { useEffect } from "react";
import { Post } from "./Post";
import { useGetPostsQuery } from "../api/apiSlice";
import styles from "../../styles/PostList.module.css";

export const PostList = ({ toggle }) => {
  const { data: posts, isError } = useGetPostsQuery();

  let sortedPosts;
  if (posts) sortedPosts = [...posts];
  useEffect(() => {
    if (posts && posts.length > 1) {
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
              toggle={toggle}
              user={post.data.userId}
              share={post.data.share}
              shareId={post.data.shareId}
            />
          ))
        : "Be the first to write a post!"}
    </div>
  );
};
