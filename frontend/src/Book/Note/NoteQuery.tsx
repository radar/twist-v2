import gql from 'graphql-tag'
import ElementWithInfoFragment from '../Notes/ElementWithInfoFragment'
import NoteFragment from '../Notes/NoteFragment'

export default gql`
  query noteQuery($bookPermalink: String!, $id: ID!) {
    note(bookPermalink: $bookPermalink, id: $id) {
      ...note

      element {
        ...elementWithInfo
      }
    }
  }

  ${ElementWithInfoFragment}
  ${NoteFragment}
`
