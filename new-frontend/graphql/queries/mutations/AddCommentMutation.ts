import gql from "graphql-tag";
import CommentFragment from "./CommentFragment";

export default gql`
  mutation addCommentMutation($noteId: ID!, $text: String!) {
    addComment(input: { noteId: $noteId, text: $text }) {
      ...commentFragment
    }
  }

  ${CommentFragment}
`;
