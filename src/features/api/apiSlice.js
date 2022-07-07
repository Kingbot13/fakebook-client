import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  FieldValue,
  increment,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { async } from "@firebase/util";

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Posts", "Users", "Comments"],
  endpoints: (build) => ({
    getPosts: build.query({
      queryFn: async () => {
        try {
          let posts = [];
          const request = await getDocs(collection(db, "posts"));
          request.forEach((doc) =>
            posts.push({ data: doc.data(), id: doc.id })
          );
          return { data: posts };
        } catch (err) {
          console.error(err);
        }
      },
      providesTags: ["Posts"],
    }),
    addPost: build.mutation({
      queryFn: async ({ name, content, photo, id, date }) => {
        try {
          await addDoc(collection(db, "posts"), {
            name: name,
            content: content,
            photo: photo,
            userId: id,
            date: date,
          });
          return { data: null };
        } catch (err) {
          console.error(err);
        }
      },
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
          await updateDoc(ref, { reactions: arrayUnion({reaction: reaction, id: userId })});
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
          // const reactionPath = `reactions.${reaction}.${reaction}`;
          // const userArrayPath = `reactions.${reaction}.usersReacted`;
          const ref = doc(db, "posts", id);
          // await updateDoc(ref, {
          //   [reactionPath]: increment(-1) ?? 1,
          //   [userArrayPath]: arrayRemove(userId),
          // });
          // const selectedReaction = ref.reactions.find(
          //   (item) => item.id === userId
          // );
          const obj = {reaction: reaction, id: userId};
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
          // const ref = doc(db, 'posts', postId);
          // await updateDoc(ref, {
          //   'comments': arrayUnion({'userId': userId, 'content': content, 'id': uuidv4(), 'date': date})
          // });
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
      queryFn: async ({commentId, content}) => {
        try {
          const ref = doc(db, "comments", commentId);
          await updateDoc(ref, {content: content});
        } catch (err) {
          console.error("could not update comment: ", err);
        }
      }
    }),
    removeComment: build.mutation({
      queryFn: async ({commentId}) => {
        try {
          await deleteDoc(db, "comments", commentId);
        } catch (err) {
          console.error("could not delete comment: ", err);
        }
      }
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
      queryFn: async ({commentId, userId}) => {
        try {
          const ref = doc(db, "comments", commentId);
          const foundReaction = ref.reactions.find(item => item.userId === userId);
          await updateDoc(ref, {
            reactions: arrayRemove(foundReaction)
          });
          return {data: null};
        } catch (err) {
          console.error("could not remove comment reaction: ");
        }
      },
      invalidatesTags: ["Comments"]
    })
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
  useEditCommentMutation
} = apiSlice;
