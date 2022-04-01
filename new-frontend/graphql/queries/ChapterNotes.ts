import gql from "graphql-tag";
import NoteFragment from "./NoteFragment";

export default gql`
  query chapterNotes($elementId: String!, $bookPermalink: String!) {
    book(permalink: $bookPermalink) {
      ... on Book {
        id
        notes(elementId: $elementId) {
          ...note
        }
      }
    }
  }

  ${NoteFragment}
`;
