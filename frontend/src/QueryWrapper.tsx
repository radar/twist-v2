import * as React from "react";
import { Query } from "react-apollo";

type QueryWrapperProps = {
  query: Query;
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

export default class QueryWrapper extends React.Component<QueryWrapperProps> {
  render() {
    const { query, variables, fetchPolicy } = this.props;
    return (
      <Query query={query} variables={variables} fetchPolicy={fetchPolicy}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return this.props.children(data);
        }}
      </Query>
    );
  }
}
