import gql from "graphql-tag";
import NoteFragment from "../../Notes/NoteFragment";

export default gql`
  mutation noteMutation($bookPermalink: ID!, $elementId: ID!, $text: String!) {
    submitNote(
      bookPermalink: $bookPermalink
      elementId: $elementId
      text: $text
    ) {
      ...note
    }
  }

  ${NoteFragment}
`;
