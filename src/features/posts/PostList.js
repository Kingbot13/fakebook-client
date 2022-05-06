import React from "react";
import { Post } from "./Post";
import { useGetPostsQuery } from "../api/apiSlice";

export const PostList = () => {
  const {data: posts} = useGetPostsQuery();

  

  return (
    <div>
      {posts ? posts.map(post => <Post key={post.id} name={post.name} content={post.content} photo={post.photo} />)
      :
      "Be the first to write a post!"}
    </div>
  );
};
