import gql from 'graphql-tag'

export default gql`
  mutation closeNoteMutation($id: ID!) {
    closeNote(input: { id: $id }) {
      id
      state
    }
  }
`
