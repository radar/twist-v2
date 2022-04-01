import gql from "graphql-tag";

export default gql`
  query chapter(
    $bookPermalink: String!
    $chapterPermalink: String!
    $gitRef: String
  ) {
    book(permalink: $bookPermalink) {
      ... on PermissionDenied {
        error
      }
      ... on Book {
        title
        id
        permalink
        latestCommit(gitRef: $gitRef) {
          sha
        }
        commit(gitRef: $gitRef) {
          id
          sha
          createdAt
          branch {
            name
          }
          chapter(permalink: $chapterPermalink) {
            id
            title
            position
            permalink
            part
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
              image {
                id
                caption
                path
              }
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
