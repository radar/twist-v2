import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const openNoteMut = gql`
  mutation openNoteMutation($id: ID!) {
    openNote(id: $id) {
      id
      state
    }
  }
`

export const openNoteMutation = compose(graphql(openNoteMut, { name: 'openNoteMutation' }))
