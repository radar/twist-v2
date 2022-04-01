import { gql } from "@apollo/client";

gql`
mutation updateBranch($bookPermalink: String!, $branchName: String!) {
  updateBranch(bookPermalink: $bookPermalink, branchName: $branchName) {
    name
  }
}
`;
