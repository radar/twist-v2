import gql from "graphql-tag";

export default gql`
  mutation deleteCommentMutation($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;
