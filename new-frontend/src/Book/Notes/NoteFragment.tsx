import gql from 'graphql-tag'

export default gql`
  fragment note on Note {
    id
    text
    createdAt
    user {
      id
      email
      name
    }
  }
`
