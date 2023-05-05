import gql from 'graphql-tag'

export default gql`
  mutation openNoteMutation($id: ID!) {
    openNote(input: { id: $id }) {
      id
      state
    }
  }
`
