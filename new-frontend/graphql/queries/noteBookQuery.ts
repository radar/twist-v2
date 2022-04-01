import gql from "graphql-tag";

export default gql`
  query noteBook($bookPermalink: String!) {
    book(permalink: $bookPermalink) {
      ... on Book {
        id
        permalink
        title
      }
    }
  }
`;
