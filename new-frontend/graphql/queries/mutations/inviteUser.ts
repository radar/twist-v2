import { gql } from "@apollo/client";

gql`
mutation inviteUser($bookId: ID!, $userId: ID!) {
  inviteUser(input: { bookId: $bookId, userId: $userId }) {
    bookId
    userId
  }
}
`;
