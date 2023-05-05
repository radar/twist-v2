import gql from "graphql-tag";

export default gql`
  mutation updateCommentMutation($id: ID!, $text: String!) {
    updateComment(input: { id: $id, text: $text }) {
      id
      text
    }
  }
`;
