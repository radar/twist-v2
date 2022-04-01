import gql from "graphql-tag";

gql`
query bookCurrentUserAuthor($permalink: String!) {
  book(permalink: $permalink) {
    ... on PermissionDenied {
      error
    }

    ... on Book {
      currentUserAuthor
    }
  }
}
`;
