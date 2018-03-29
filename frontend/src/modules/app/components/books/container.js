import { graphql, compose } from "react-apollo";
import gql from 'graphql-tag';

const allBooks = gql`
  query BooksQuery {
    books {
      id
      title
      permalink
      blurb
    }
  }
`;


export default compose(graphql(allBooks));
