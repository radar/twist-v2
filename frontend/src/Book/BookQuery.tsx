import gql from "graphql-tag";

export default gql`
  query bookQuery($permalink: String!, $gitRef: String) {
    book(permalink: $permalink) {
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
          frontmatter: chapters(part: FRONTMATTER) {
            ...chapterFields
          }
          mainmatter: chapters(part: MAINMATTER) {
            ...chapterFields
          }
          backmatter: chapters(part: BACKMATTER) {
            ...chapterFields
          }
        }
      }
    }
  }

  fragment chapterFields on Chapter {
    id
    title
    position
    permalink
  }
`;
