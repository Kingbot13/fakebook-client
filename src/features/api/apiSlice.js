import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseURL: "https://desolate-harbor-02562.herokuapp.com/api",
  }),
  prepareHeaders: (headers) => {
    const storage = localStorage;
    const token = storage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  tagTypes: ["Posts", "Users", "Comments", "Replies"],
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),
    addPost: build.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Posts"],
    }),
    editPost: build.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: build.mutation({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    getUsers: build.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    updateReaction: build.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    getComments: build.query({
      query: () => "/comments",
      providesTags: ["Comments"],
    }),
    addComment: build.mutation({
      query: (comment, post) => ({
        url: `/posts/${post.id}/comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
    editComment: build.mutation({
      query: (comment) => ({
        url: `/posts/${comment.postId}/comments/${comment.id}`,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
    removeComment: build.mutation({
      query: (comment) => ({
        url: `/posts/${comment.postId}/comments/${comment.id}`,
        method: "DELETE",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
    updateCommentReaction: build.mutation({
      query: (comment) => ({
        url: `/posts/${comment.postId}/comments/${comment.id}`,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
    getReplies: build.query({
      query: () => "/replies",
      providesTags: ["Replies"],
    }),
    addReply: build.mutation({
      query: (reply) => ({
        url: `comments/${reply.commentId}/replies`,
        method: "POST",
        body: reply,
      }),
      invalidatesTags: ["Replies"],
    }),
    editReply: build.mutation({
      query: (reply) => ({
        url: `/comments/${reply.commentId}/${reply.id}`,
        method: "PUT",
        body: reply,
      }),
      invalidatesTags: ["Replies"],
    }),
    removeReply: build.mutation({
      query: (reply) => ({
        url: `comments/${reply.commentId}/replies/${reply.id}`,
        method: "PUT",
        body: reply,
      }),
      invalidatesTags: ["Replies"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUsersQuery,
  useAddPostMutation,
  useAddUserMutation,
  useUpdateReactionMutation,
  useAddCommentMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetCommentsQuery,
  useUpdateCommentReactionMutation,
  useRemoveCommentMutation,
  useEditCommentMutation,
  useAddReplyMutation,
  useGetRepliesQuery,
  useEditReplyMutation,
  useRemoveReplyMutation,
} = apiSlice;
