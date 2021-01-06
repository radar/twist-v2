import gql from "graphql-tag";
import ElementWithInfoFragment from "../Notes/ElementWithInfoFragment";
import NoteFragment from "../Notes/NoteFragment";

export default gql`
  query note($bookPermalink: String!, $number: Int!) {
    note(bookPermalink: $bookPermalink, number: $number) {
      ...note

      element {
        ...elementWithInfo
      }
    }
  }

  ${ElementWithInfoFragment}
  ${NoteFragment}
`;
