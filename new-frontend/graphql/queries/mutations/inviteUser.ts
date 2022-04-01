import { gql } from "@apollo/client";

gql`
mutation inviteUser($bookId: ID!, $userId: ID!) {
  inviteUser(bookId: $bookId, userId: $userId) {
    bookId
    userId
  }
}
`;
