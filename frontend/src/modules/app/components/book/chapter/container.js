import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const book = gql`
  query chapterQuery($bookPermalink: String!, $chapterPermalink: String!) {
    book(permalink: $bookPermalink) {
      title
      id
      permalink
      defaultBranch {
        id
        chapter(permalink: $chapterPermalink) {
          id
          title
          position
          permalink
          part
          elements {
            id
            content
            tag
            noteCount
          }
        }
      }
    }
  }
`

export const chapterWithData = graphql(book, {
  options: props => ({
    variables: {
      bookPermalink: props.match.params.bookPermalink,
      chapterPermalink: props.match.params.chapterPermalink
    }
  })
})

const noteMut = gql`
  mutation noteMutation($elementID: String!, $text: String!) {
    createNote(elementID: $elementID, text: $text) {
      id
    }
  }
`

export const noteMutation = compose(graphql(noteMut, { name: 'noteMutation' }))
