import gql from "graphql-tag";

export default gql`
  mutation updateCommentMutation($id: ID!, $text: String!) {
    updateComment(id: $id, text: $text) {
      id
      text
    }
  }
`;
