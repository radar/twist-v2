import gql from "graphql-tag"
import CommentFragment from "./CommentFragment"

export default gql`
  query commentsQuery($noteId: ID!) {
    comments(noteId: $noteId) {
      ...commentFragment
    }
  }

  ${CommentFragment}
`
