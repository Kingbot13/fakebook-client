import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// const getPostsFromFirebase = async () => {
//   try {
//     let posts = [];
//     const request = await getDocs(collection(db, "posts"));
//     request.forEach((doc) => posts.push(doc.data()));
//     return { data: posts };
//   } catch (err) {
//     console.error(err);
//   }
// };

// const getUsers = async () => {
//   try {
//     let users = [];
//     const request = await getDocs(collection(db, "users"));
//     request.forEach((doc) => users.push(doc.data()));
//     return { data: users };
//   } catch (err) {
//     console.error(err);
//   }
// };

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getPosts: build.query({
      queryFn: async () => {
        try {
          let posts = [];
          const request = await getDocs(collection(db, "posts"));
          request.forEach((doc) =>
            posts.push({ data: doc.data(), id: doc.id })
          );
          // getPostsFromFirebase();
          console.log(posts);
          return { data: posts };
        } catch (err) {
          console.error(err);
        }
      },
    }),
    addPost: build.mutation({
      queryFn: async (name, content, photo, userId) => {
        try {
          await addDoc(collection(db, "posts"), {
            name: name,
            content: content,
            photo: photo,
            userId: userId,
          });
        } catch (err) {
          console.error(err);
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
          // getUsers();
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetPostsQuery, useGetUsersQuery } = apiSlice;
