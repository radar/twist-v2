import gql from 'graphql-tag'

export default gql`
  mutation noteMutation($bookId: ID!, $elementId: ID!, $text: String!) {
    submitNote(bookId: $bookId, elementId: $elementId, text: $text) {
      id
    }
  }
`
