import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const getPostsFromFirebase = async () => {
  try {
    let posts = [];
    const request = await getDocs(collection(db, "posts"));
    request.forEach((doc) => posts.push({ data: doc.data() }));
    return { data: posts };
  } catch (err) {
    console.error(err);
  }
};

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getPosts: build.query({
      queryFn() {
        try {
          getPostsFromFirebase();
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});
