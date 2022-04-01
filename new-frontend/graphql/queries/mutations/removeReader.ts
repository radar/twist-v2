import gql from "graphql-tag"

gql`
mutation removeReader($bookId: ID!, $userId: ID!) {
  removeReader(bookId: $bookId, userId: $userId) {
    bookId
    userId
  }
}
`;
