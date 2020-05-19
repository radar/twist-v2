import React, { FunctionComponent } from "react";

import { useQuery } from "@apollo/react-hooks";

type QueryWrapperProps = {
  query: {};
  variables?: {};
  fetchPolicy?:
    | "cache-first"
    | "network-only"
    | "cache-only"
    | "no-cache"
    | "standby"
    | undefined;
  children(data: any): React.ReactNode;
};

const QueryWrapper: FunctionComponent<QueryWrapperProps> = (props) => {
  const { query, variables, fetchPolicy, children } = props;
  const { loading, error, data } = useQuery(query, {
    variables: variables,
    fetchPolicy: fetchPolicy,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! ${error.message}</div>;

  return <span>{children(data)}</span>;
};

export default QueryWrapper;
