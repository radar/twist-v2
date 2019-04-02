import gql from 'graphql-tag'

export default gql`
  fragment note on Note {
    id
    text
    createdAt
    state
    user {
      id
      email
      name
    }
  }
`
