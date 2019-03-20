import gql from 'graphql-tag'

export default gql`
  query BooksQuery {
    books {
      id
      title
      permalink
      blurb
    }
  }
`
