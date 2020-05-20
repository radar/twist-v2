import gql from "graphql-tag";

export default gql`
  query branchesQuery($bookPermalink: String!) {
    book(permalink: $bookPermalink) {
      ... on Book {
        id
        title

        branches {
          id
          default
          name
        }
      }
    }
  }
`;
