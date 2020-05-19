import gql from "graphql-tag";

export default gql`
  query currentUser {
    currentUser {
      __typename
      id
      githubLogin
      email
    }
  }
`;
