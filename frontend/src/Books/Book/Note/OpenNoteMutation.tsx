import gql from 'graphql-tag'

export default gql`
  mutation openNoteMutation($id: ID!) {
    openNote(id: $id) {
      id
      state
    }
  }
`
