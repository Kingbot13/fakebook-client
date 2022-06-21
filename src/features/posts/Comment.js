import React from "react";
import { useGetUsersQuery } from "../api/apiSlice";
import { UserPhoto } from "../users/UserPhoto";
import Proptypes from "prop-types";

const Comment = ({ userId, content, id }) => {
  const { data: users } = useGetUsersQuery();
  const foundUser = users.find((user) => user.id === userId);
  const name = foundUser.data.name;
  return (
    <div>
      <UserPhoto />
      <div>
        <div>
          <div>
            <div>{name}</div>
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  userId: Proptypes.string,
  content: Proptypes.string,
  id: Proptypes.string,
};

export { Comment };
