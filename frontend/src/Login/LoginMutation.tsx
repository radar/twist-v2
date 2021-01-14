import gql from "graphql-tag";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on SuccessfulLoginResult {
        email
        token
      }
      ... on FailedLoginResult {
        error
      }
    }
  }
`;

export default loginMutation;
