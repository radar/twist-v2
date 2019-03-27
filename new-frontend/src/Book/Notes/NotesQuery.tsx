import gql from 'graphql-tag'

export default gql`
  query bookQuery($bookPermalink: String!, $state: String!) {
    elementsWithNotes(bookPermalink: $bookPermalink, state: $state) {
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
      notes(state: $state) {
        id
        text
        user {
          id
          email
        }
      }
    }
  }
`
