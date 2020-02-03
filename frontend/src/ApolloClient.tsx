import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import { IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import introspectionQueryResultData from "./fragmentTypes.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_HOST + "/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem("auth-token");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ fragmentMatcher })
});
