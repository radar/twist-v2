import gql from 'graphql-tag'

export default gql`
  mutation closeNoteMutation($id: ID!) {
    closeNote(id: $id) {
      id
      state
    }
  }
`
