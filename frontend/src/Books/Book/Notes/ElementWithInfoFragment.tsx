import gql from 'graphql-tag'

export default gql`
  fragment elementWithInfo on Element {
    id
    content
    tag
    chapter {
      title
      part
      position
      commit {
        sha
        branch {
          name
        }
      }
    }
  }
`
