import React from "react";

const wrappedQuery = (query: Function, variables?: {}) => {
  const { data, loading, error } = query(variables);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! ${error.message}</div>;

  return new Promise(data);
};

export default wrappedQuery;
