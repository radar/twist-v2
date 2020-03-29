import gql from "graphql-tag";
import NoteFragment from "../Notes/NoteFragment";

export default gql`
  query chapterQuery($bookPermalink: String!, $chapterPermalink: String!) {
    book(permalink: $bookPermalink) {
      title
      id
      permalink
      defaultBranch {
        name
        id
        chapter(permalink: $chapterPermalink) {
          id
          title
          position
          permalink
          part
          commit {
            sha
          }
          sections {
            ...sectionFragment
            subsections {
              ...sectionFragment
            }
          }
          previousChapter {
            ...chapterFragment
          }
          nextChapter {
            ...chapterFragment
          }

          footnotes {
            identifier
            content
          }

          elements {
            id
            content
            tag
            noteCount
            identifier
            notes(state: OPEN) {
              ...note
            }
            image {
              caption
              path
            }
          }
        }
      }
    }
  }

  fragment sectionFragment on Section {
    id
    title
    link
  }

  fragment chapterFragment on Chapter {
    id
    title
    position
    part
    permalink
  }

  ${NoteFragment}
`;
