import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://desolate-harbor-02562.herokuapp.com/api",
    prepareHeaders: (headers) => {
      const storage = localStorage;
      const token = storage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Posts", "Users", "Comments", "Replies"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Posts"],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getCurrentUser: builder.query({
      query: () => "/auth/facebook/token",
    }),
    updateReaction: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}/reactions`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    getComments: builder.query({
      query: () => "/comments",
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query: (comment, post) => ({
        url: `/posts/${post.id}/comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
    editComment: builder.mutation({
      query: (comment) => ({
        url: `/posts/${comment.postId}/comments/${comment.id}`,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
    removeComment: builder.mutation({
      query: (comment) => ({
        url: `/posts/${comment.postId}/comments/${comment.id}`,
        method: "DELETE",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
    updateCommentReaction: builder.mutation({
      query: (comment) => ({
        url: `/posts/${comment.postId}/comments/${comment.id}/reactions`,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
    getReplies: builder.query({
      query: () => "/replies",
      providesTags: ["Replies"],
    }),
    addReply: builder.mutation({
      query: (reply) => ({
        url: `comments/${reply.commentId}/replies`,
        method: "POST",
        body: reply,
      }),
      invalidatesTags: ["Replies"],
    }),
    editReply: builder.mutation({
      query: (reply) => ({
        url: `/comments/${reply.commentId}/${reply.id}`,
        method: "PUT",
        body: reply,
      }),
      invalidatesTags: ["Replies"],
    }),
    removeReply: builder.mutation({
      query: (reply) => ({
        url: `comments/${reply.commentId}/replies/${reply.id}`,
        method: "PUT",
        body: reply,
      }),
      invalidatesTags: ["Replies"],
    }),
    updateReplyReaction: builder.mutation({
      query: (reply) => ({
        url: `/comments/${reply.commentId}/replies/${reply.id}`,
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
  useGetCurrentUserQuery,
  useAddPostMutation,
  useUpdateReplyReactionMutation,
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
