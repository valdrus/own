import { FC } from "react";
import { User } from "../../api/types";
import "./UserView.css";

interface UserViewProp {
  user: User,
}

export const UserView: FC<UserViewProp> = ({ user }) => {

  return (
    <div className="user-view">
      <div className="user-view__logo">
        {user.username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name">{user.username}</span>
    </div>
  );
};
