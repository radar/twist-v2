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

        notes {
          id
          createdAt
          text
          user {
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
