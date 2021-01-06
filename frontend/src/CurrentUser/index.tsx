import * as React from "react";

import QueryWrapper from "../QueryWrapper";
import CurrentUserContext from "./context";
import { useCurrentUserQuery, CurrentUserQuery } from "../graphql/types";

const CurrentUser: React.FC = ({ children }) => {
  const { data, loading, error } = useCurrentUserQuery();

  const renderCurrentUser = (data: CurrentUserQuery) => {
    return (
      <CurrentUserContext.Provider value={data.currentUser}>
        {children}
      </CurrentUserContext.Provider>
    );
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderCurrentUser(data)}
    </QueryWrapper>
  );
};

export default CurrentUser;
