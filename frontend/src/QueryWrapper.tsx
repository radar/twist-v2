import { ApolloError } from "@apollo/client";
import React from "react";

type QueryWrapperProps = {
  loading: boolean;
  error: ApolloError | undefined;
};

const QueryWrapper: React.FC<QueryWrapperProps> = ({
  loading,
  error,
  children,
}) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! ${error.message}</div>;

  return <>{children}</>;
};

export default QueryWrapper;
