import gql from 'graphql-tag'

export default gql`
  fragment commentFragment on Comment {
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
