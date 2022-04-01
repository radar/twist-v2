import gql from "graphql-tag";
import CommentFragment from "../../../graphql/queries/mutations/CommentFragment";

export default gql`
  query commentsQuery($noteId: ID!) {
    comments(noteId: $noteId) {
      ...commentFragment
    }
  }

  ${CommentFragment}
`;
