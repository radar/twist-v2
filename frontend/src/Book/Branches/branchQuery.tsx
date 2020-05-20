import gql from "graphql-tag";

export default gql`
  query branchQuery($bookPermalink: String!, $name: String!) {
    book(permalink: $bookPermalink) {
      ... on Book {
        id
        title

        branch(name: $name) {
          id
          default
          name

          commits {
            sha
            message
            createdAt
          }
        }
      }
    }
  }
`;
