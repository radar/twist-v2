import gql from 'graphql-tag'

export default gql`
mutation noteMutation($elementID: String!, $text: String!) {
  submitNote(elementID: $elementID, text: $text) {
    id
  }
}
`
