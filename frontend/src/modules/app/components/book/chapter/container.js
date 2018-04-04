import { graphql } from 'react-apollo'
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
          }
        }
      }
    }
  }
`

export const chapterWithData = graphql(book, {
  options: (props) => ({
    variables: {
      bookPermalink: props.match.params.bookPermalink,
      chapterPermalink: props.match.params.chapterPermalink
    }
  })
})
