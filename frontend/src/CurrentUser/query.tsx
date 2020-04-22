import gql from "graphql-tag";

export default gql`
  query currentUser {
    currentUser {
      __typename
      githubLogin
      email
    }
  }
`;
