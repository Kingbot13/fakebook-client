import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Posts", "Users"],
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
      queryFn: async ({ name, content, photo, id }) => {
        try {
          await addDoc(collection(db, "posts"), {
            name: name,
            content: content,
            photo: photo,
            userId: id,
            date: new Date(),
          });
          return { data: null };
        } catch (err) {
          console.error(err);
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
  }),
});

export const {
  useGetPostsQuery,
  useGetUsersQuery,
  useAddPostMutation,
  useAddUserMutation,
} = apiSlice;
