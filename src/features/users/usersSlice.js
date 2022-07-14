import { apiSlice } from "../api/apiSlice";
import { createSelector } from "@reduxjs/toolkit";

const selectUsersResult = apiSlice.endpoints.getUsers.select();
const emptyUsers = [];

export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => {
    console.log(usersResult);
    console.log(usersResult.data);
    return usersResult?.data ?? emptyUsers;
  }
);

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find((user) => user.id === userId)
);
