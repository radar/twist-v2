import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const noteQuery = gql`
  query bookQuery($permalink: String!, $id: ID!) {
    book(permalink: $permalink) {
      title
      permalink

      note(id: $id) {
        createdAt
        text
        element {
          id
          content

          chapter {
            title
            commit {
              sha
              created_at

              branch {
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
