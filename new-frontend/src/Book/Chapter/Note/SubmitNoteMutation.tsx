import gql from 'graphql-tag'

export default gql`
mutation noteMutation($elementId: String!, $text: String!) {
  submitNote(elementId: $elementId, text: $text) {
    id
  }
}
`
