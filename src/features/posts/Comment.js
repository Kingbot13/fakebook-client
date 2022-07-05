import React from "react";
import { useGetUsersQuery } from "../api/apiSlice";
import { UserPhoto } from "../users/UserPhoto";
import Proptypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import styles from '../../styles/Comment.module.css';

const Comment = ({ userId, content, id, date }) => {
  const { data: users } = useGetUsersQuery();
  const foundUser = users.find((user) => user.id === userId);
  const name = foundUser.data.name;
  const formattedDate = formatDistanceToNow(new Date(date));

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
      <div>
        <div role='button'>Like</div>
        <div role='button'>Reply</div>
        <div>{formattedDate}</div>
      </div>
      <div>
        <div role='button'className={styles.optionsBtn}>
          <i/>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  userId: Proptypes.string,
  content: Proptypes.string,
  id: Proptypes.string,
  date: Proptypes.string
};

export { Comment };
