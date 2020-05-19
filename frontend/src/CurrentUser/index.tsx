import * as React from "react";

import QueryWrapper from "../QueryWrapper";
import currentUserQuery from "./query";
import CurrentUserContext from "./context";
import User from "./user";

type CurrentUserProps = {
  children: React.ReactNode;
};

type CurrentUserData = {
  currentUser: User | null;
};

export default class CurrentUser extends React.Component<CurrentUserProps> {
  render() {
    return (
      <QueryWrapper query={currentUserQuery} fetchPolicy="network-only">
        {(data: CurrentUserData) => {
          return (
            <CurrentUserContext.Provider value={data.currentUser}>
              {this.props.children}
            </CurrentUserContext.Provider>
          );
        }}
      </QueryWrapper>
    );
  }
}
