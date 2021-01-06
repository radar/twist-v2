import gql from "graphql-tag";

export default gql`
  query Books {
    books {
      id
      title
      permalink
      blurb
    }
  }
`;
