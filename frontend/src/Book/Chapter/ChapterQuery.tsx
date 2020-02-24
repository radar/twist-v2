import gql from "graphql-tag";

export default gql`
  query chapterQuery($bookPermalink: String!, $chapterPermalink: String!) {
    book(permalink: $bookPermalink) {
      title
      id
      permalink
      defaultBranch {
        id
        chapter(permalink: $chapterPermalink) {
          id
          title
          position
          permalink
          part
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
          elements {
            id
            content
            tag
            noteCount
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
`;
