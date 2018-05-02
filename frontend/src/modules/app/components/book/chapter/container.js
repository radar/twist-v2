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
          sections {
            ...sectionFragment
            subsections {
              ...sectionFragment
            }
          }
          previousChapter {
            ...chapterFragment
          }
          nextChapter {
            ...chapterFragment
          }
          elements {
            id
            content
            tag
            noteCount
            image {
              path
            }
          }
        }
      }
    }
  }

  fragment sectionFragment on Section {
    id
    title
    link
  }

  fragment chapterFragment on Chapter {
    id
    title
    position
    part
    permalink
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
    submitNote(elementID: $elementID, text: $text) {
      id
    }
  }
`

export const noteMutation = compose(graphql(noteMut, { name: 'noteMutation' }))
