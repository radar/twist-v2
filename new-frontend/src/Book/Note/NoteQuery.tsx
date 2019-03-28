import gql from 'graphql-tag'
import ElementWithInfoFragment from '../Notes/ElementWithInfoFragment'

export default gql`
  query noteQuery($bookPermalink: String!, $id: ID!) {
    note(bookPermalink: $bookPermalink, id: $id) {
      id
      text

      element {
        ...elementWithInfo
      }

      user {
        id
        email
      }
    }
  }

  ${ElementWithInfoFragment}
`
