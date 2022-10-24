import React, { useEffect } from "react";
import { Post } from "./Post";
import { useGetPostsQuery } from "../api/apiSlice";
import styles from "../../styles/PostList.module.css";

export const PostList = ({ toggle }) => {
  const { data: posts, isError } = useGetPostsQuery();

  let sortedPosts;
  if (posts && posts.length) sortedPosts = [...posts];
  useEffect(() => {
    if (posts && posts.length > 1) {
      sortedPosts.sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
    }
  }, [posts]);

  return (
    <div className={styles.container}>
      {posts && posts.length
        ? sortedPosts.map((post) => (
            <Post
              key={post._id}
              name={{
                firstName: post.user.firstName,
                lastName: post.user.lastName,
              }}
              content={post.content}
              photo={post.photo}
              date={post.date}
              id={post._id}
              reactions={post.reactions}
              toggle={toggle}
              user={post.user}
              share={post.share}
              shareId={post.shareId}
            />
          ))
        : "Be the first to write a post!"}
    </div>
  );
};
