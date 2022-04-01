import gql from "graphql-tag";
import NoteFragment from "../NoteFragment";

export default gql`
  mutation submitNote($bookPermalink: ID!, $elementId: ID!, $text: String!) {
    note: submitNote(
      bookPermalink: $bookPermalink
      elementId: $elementId
      text: $text
    ) {
      ...note
    }
  }

  ${NoteFragment}
`;
