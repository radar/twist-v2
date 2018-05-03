import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const closeNoteMut = gql`
  mutation closeNoteMutation($id: ID!) {
    closeNote(id: $id) {
      id
      state
    }
  }
`

export const closeNoteMutation = compose(graphql(closeNoteMut, { name: 'closeNoteMutation' }))
