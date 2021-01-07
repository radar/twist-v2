import gql from "graphql-tag";

gql`
  query bookTitle($permalink: String!) {
    book(permalink: $permalink) {
      ... on PermissionDenied {
        error
      }

      ... on Book {
        title
      }
    }
  }
`;

gql`
  query users($githubLogin: String!) {
    users(githubLogin: $githubLogin) {
      id
      githubLogin
      name
    }
  }
`;
