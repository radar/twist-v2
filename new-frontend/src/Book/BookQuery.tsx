import gql from 'graphql-tag'

export default gql`
  query bookQuery($permalink: String!) {
    book(permalink: $permalink) {
      title
      id
      permalink
      defaultBranch {
        id
        name
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
`
