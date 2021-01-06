import gql from "graphql-tag";
import ElementWithInfoFragment from "./ElementWithInfoFragment";
import NoteFragment from "../Notes/NoteFragment";

export default gql`
  query bookNotes($bookPermalink: String!, $state: NoteState!) {
    elementsWithNotes(bookPermalink: $bookPermalink, state: $state) {
      ...elementWithInfo

      notes(state: $state) {
        ...note
      }
    }
  }

  ${ElementWithInfoFragment}
  ${NoteFragment}
`;
