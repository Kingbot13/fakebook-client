import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseURL: "https://desolate-harbor-02562.herokuapp.com/api",
  }),
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
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
      query:,
      invalidatesTags: ["Posts"],
    }),
    editPost: build.mutation({
      queryFn: async ({ postId, content }) => {
        try {
          const ref = doc(db, "posts", postId);
          await updateDoc(ref, { content: content });
          return { data: null };
        } catch (err) {
          console.error("could not update post: ", err);
        }
      },
      invalidatesTags: ["Posts"],
    }),
    deletePost: build.mutation({
      queryFn: async ({ postId }) => {
        try {
          await deleteDoc(doc(db, "posts", postId));
          return { data: null };
        } catch (err) {
          console.error("problem deleting post: ", err);
        }
      },
      invalidatesTags: ["Posts"],
    }),
    getUsers: build.query({
      queryFn: async () => {
        try {
          let users = [];
          const request = await getDocs(collection(db, "users"));
          request.forEach((doc) =>
            users.push({ data: doc.data(), id: doc.id })
          );
          return { data: users };
        } catch (err) {
          console.error(err);
        }
      },
      providesTags: ["Users"],
    }),
    addUser: build.mutation({
      queryFn: async ({ name, photo, id }) => {
        try {
          await setDoc(doc(db, "users", `${id}`), {
            name: name,
            photo: photo,
          });
          return { data: null };
        } catch (err) {
          console.error(err);
        }
      },
      invalidatesTags: ["Users"],
    }),
    addReaction: build.mutation({
      queryFn: async ({ id, reaction, userId }) => {
        try {
          const ref = doc(db, "posts", id);
          await updateDoc(ref, {
            reactions: arrayUnion({ reaction: reaction, id: userId }),
          });
          return { data: null };
        } catch (err) {
          console.error(err);
          return { error: "error adding reaction" };
        }
      },
      invalidatesTags: ["Posts"],
    }),
    removeReaction: build.mutation({
      queryFn: async ({ id, userId, reaction }) => {
        try {
          const ref = doc(db, "posts", id);
          const obj = { reaction: reaction, id: userId };
          await updateDoc(ref, { reactions: arrayRemove(obj) });
          return { data: null };
        } catch (err) {
          console.error(err);
          return { error: "error removing reaction" };
        }
      },
      invalidatesTags: ["Posts"],
    }),
    getComments: build.query({
      queryFn: async () => {
        try {
          let comments = [];
          const request = await getDocs(collection(db, "comments"));
          request.forEach((doc) =>
            comments.push({ id: doc.id, data: doc.data() })
          );
          return { data: comments };
        } catch (err) {
          console.error(err);
          return { error: "error fetching posts" };
        }
      },
      providesTags: ["Comments"],
    }),
    addComment: build.mutation({
      queryFn: async ({ userId, content, postId, date }) => {
        try {
          await addDoc(collection(db, "comments"), {
            content: content,
            date: date,
            postId: postId,
            userId: userId,
          });
          return { data: null };
        } catch (err) {
          console.error("could not add comment: ", err);
        }
      },
      invalidatesTags: ["Comments"],
    }),
    editComment: build.mutation({
      queryFn: async ({ id, content }) => {
        try {
          const ref = doc(db, "comments", id);
          await updateDoc(ref, { content: content });
          return { data: null };
        } catch (err) {
          console.error("could not update comment: ", err);
        }
      },
      invalidatesTags: ["Comments"],
    }),
    removeComment: build.mutation({
      queryFn: async ({ commentId }) => {
        try {
          await deleteDoc(doc(db, "comments", commentId));
          return { data: null };
        } catch (err) {
          console.error("could not delete comment: ", err);
        }
      },
      invalidatesTags: ["Comments"],
    }),
    addCommentReaction: build.mutation({
      queryFn: async ({ commentId, userId, reaction }) => {
        try {
          const ref = doc(db, "comments", commentId);
          await updateDoc(ref, {
            reactions: arrayUnion({ reaction: reaction, id: userId }),
          });
          return { data: null };
        } catch (err) {
          console.error("could not add comment reaction : ", err);
        }
      },
      invalidatesTags: ["Comments"],
    }),
    removeCommentReaction: build.mutation({
      queryFn: async ({ commentId, userId }) => {
        try {
          const ref = doc(db, "comments", commentId);
          const foundReaction = ref.reactions.find(
            (item) => item.userId === userId
          );
          await updateDoc(ref, {
            reactions: arrayRemove(foundReaction),
          });
          return { data: null };
        } catch (err) {
          console.error("could not remove comment reaction: ");
        }
      },
      invalidatesTags: ["Comments"],
    }),
    getReplies: build.query({
      queryFn: async () => {
        try {
          let replies = [];
          const req = await getDocs(collection(db, "replies"));
          req.forEach((doc) => replies.push({ id: doc.id, data: doc.data() }));
          return { data: replies };
        } catch (err) {
          console.error(err);
        }
      },
      providesTags: ["Replies"],
    }),
    addReply: build.mutation({
      queryFn: async ({ userId, content, commentId, date }) => {
        try {
          await addDoc(collection(db, "replies"), {
            content: content,
            userId: userId,
            date: date,
            commentId: commentId,
          });
          return { data: null };
        } catch (err) {
          console.error(err);
        }
      },
      invalidatesTags: ["Replies"],
    }),
    editReply: build.mutation({
      queryFn: async ({ id, content }) => {
        try {
          const ref = doc(db, "replies", id);
          await updateDoc(ref, { content: content });
          return { data: null };
        } catch (err) {
          console.error("could not update reply", err);
        }
      },
      invalidatesTags: ["Replies"],
    }),
    removeReply: build.mutation({
      queryFn: async ({ id }) => {
        try {
          await deleteDoc(doc(db, "replies", id));
          return { data: null };
        } catch (err) {
          console.error(err);
        }
      },
      invalidatesTags: ["Replies"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUsersQuery,
  useAddPostMutation,
  useAddUserMutation,
  useAddReactionMutation,
  useRemoveReactionMutation,
  useAddCommentMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetCommentsQuery,
  useAddCommentReactionMutation,
  useRemoveCommentReactionMutation,
  useRemoveCommentMutation,
  useEditCommentMutation,
  useAddReplyMutation,
  useGetRepliesQuery,
  useEditReplyMutation,
  useRemoveReplyMutation,
} = apiSlice;
