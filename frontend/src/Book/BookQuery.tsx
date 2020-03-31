import gql from "graphql-tag";

export default gql`
  query bookQuery($permalink: String!, $commitSHA: String) {
    book(permalink: $permalink) {
      title
      id
      permalink
      commit(sha: $commitSHA) {
        id
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

  fragment chapterFields on Chapter {
    id
    title
    position
    permalink
  }
`;
