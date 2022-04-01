import gql from "graphql-tag";

gql`
query readers($permalink: String!) {
  book(permalink: $permalink) {
    ... on PermissionDenied {
      error
    }

    ... on Book {
      id
      title

      readers {
        id
        author
        githubLogin
        name
      }
    }
  }
}
`;
