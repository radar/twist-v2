import gql from 'graphql-tag'

export default gql`
  query bookQuery($bookPermalink: String!) {
    book(permalink: $bookPermalink) {
      id
      title
    }
  }
`
