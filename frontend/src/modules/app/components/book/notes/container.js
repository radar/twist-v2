import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const book = gql`
  query bookQuery($permalink: String!) {
    book(permalink: $permalink) {
      id
      title
      permalink

      elements: elementsWithNotes {
        id
        content

        chapter {
          id
          position
          part
          title

          commit {
            sha
            createdAt
            branch {
              name
            }
          }
        }

        notes {
          id
          createdAt
          text

          user {
            name
            email
          }
        }
      }
    }
  }
`

export const bookWithData = graphql(book, {
  options: props => ({
    variables: { permalink: props.match.params.permalink }
  })
})
