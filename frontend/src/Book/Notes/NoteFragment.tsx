import gql from "graphql-tag";

export default gql`
  fragment note on Note {
    id
    number
    text
    createdAt
    state
    user {
      __typename
      id
      email
      name
    }

    comments {
      id
      text
      createdAt
      user {
        __typename
        id
        email
        name
      }
    }
  }
`;
