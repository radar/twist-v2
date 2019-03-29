import gql from 'graphql-tag'
import ElementWithInfoFragment from './ElementWithInfoFragment'
import NoteFragment from '../Notes/NoteFragment'

export default gql`
  query bookQuery($bookPermalink: String!, $state: String!) {
    elementsWithNotes(bookPermalink: $bookPermalink, state: $state) {
      ...elementWithInfo

      notes(state: $state) {
        ...note
      }
    }
  }

  ${ElementWithInfoFragment}
  ${NoteFragment}
`
