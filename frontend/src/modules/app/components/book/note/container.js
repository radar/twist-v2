import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const noteQuery = gql`
  query bookQuery($permalink: String!, $id: ID!) {
    book(permalink: $permalink) {
      id
      title
      permalink

      note(id: $id) {
        id
        createdAt
        text
        element {
          id
          content
          image {
            path
          }
          tag

          chapter {
            id
            title
            commit {
              id
              sha
              created_at

              branch {
                id
                name
              }
            }
          }
        }

        user {
          name
          email
        }
      }
    }
  }
`

export const noteWithData = graphql(noteQuery, {
  options: props => ({
    variables: { permalink: props.match.params.permalink, id: props.match.params.id }
  })
})
