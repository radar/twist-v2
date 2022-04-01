import { gql } from "@apollo/client";

gql`
query users($githubLogin: String!) {
  users(githubLogin: $githubLogin) {
    id
    githubLogin
    name
  }
}
`;
