import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const elements = gql`
  query elementsQuery($bookPermalink: String!, $state: String!) {
    elements: elementsWithNotes(bookPermalink: $bookPermalink, state: $state) {
      id
      content

      chapter {
        id
        position
        part
        title

        commit {
          id
          sha
          createdAt
          branch {
            id
            name
          }
        }
      }

      notes(state: $state) {
        id
        createdAt
        text
        state

        user {
          id
          name
          email
        }
      }
    }
  }
`

export const elementsWithData = graphql(elements, {
  options: props => ({
    variables: { bookPermalink: props.bookPermalink, state: props.state }
  })
})
