import gql from 'graphql-tag'
import ElementWithInfoFragment from './ElementWithInfoFragment'

export default gql`
  query bookQuery($bookPermalink: String!, $state: String!) {
    elementsWithNotes(bookPermalink: $bookPermalink, state: $state) {
      ...elementWithInfo

      notes(state: $state) {
        id
        text
        user {
          id
          email
        }
      }
    }
  }

  ${ElementWithInfoFragment}
`
