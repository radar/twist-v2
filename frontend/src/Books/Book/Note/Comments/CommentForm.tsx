import * as React from "react"
import Gravatar from "react-gravatar"
import { Mutation, MutationFn } from "react-apollo"

import CurrentUserContext from "../../../../Users/CurrentUser/Context"

import { CommentProps } from "./Comment"
import commentsQuery from "./CommentsQuery"
import * as styles from "./Comment.module.scss"
import addCommentMutation from "./AddCommentMutation"

type CommentFormProps = {
  updateComments(comments: CommentProps[]): void
  noteId: string
}

type CommentFormState = {
  text: string
}

interface AddCommentMutationData {
  noteId: string,
  text: string,
}

class AddCommentMutation extends Mutation<AddCommentMutationData, {}> {}

type CacheData = {
  comments: CommentProps[]
}


export default class CommentForm extends React.Component<CommentFormProps, CommentFormState> {
  submit(addComment: MutationFn) {
    addComment({
      variables: { noteId: this.props.noteId, text: this.state.text },
      update: (store, { data: { addComment }}) => {
        const cacheData = store.readQuery({ query: commentsQuery, variables: { noteId: this.props.noteId }})
        if (cacheData) {
          const comments = (cacheData as CacheData).comments.concat([addComment])
          store.writeQuery({
            query: commentsQuery,
            data: { comments: comments },
          });

          this.props.updateComments(comments)
        }
      }
    })
  }

  render() {

    return (
      <AddCommentMutation mutation={addCommentMutation}>
        {(addComment, { data }) => {
          return (
            <div className={styles.comment}>
            <div className="row">
              <div className={`${styles.avatar} col-md-1`}>
              <CurrentUserContext.Consumer>
                {user => user? <Gravatar email={user.email} /> : null }
              </CurrentUserContext.Consumer>
              </div>

              <div className={`${styles.commentContainer} col-md-11`}>
                <div className="row">
                  <div className={`${styles.commentHeader} col-md-12`}>
                    <strong>Add a comment</strong>
                  </div>
                </div>
                <div className="row">
                  <div className={`${styles.commentBody} col-md-12`}>
                    <form onSubmit={e => {
                        e.preventDefault()
                        this.submit(addComment)
                      }}>
                      <textarea placeholder="Leave a comment" onChange={e => this.setState({ text: e.target.value })}></textarea>
                      <input className="btn btn-success" type="submit" value="Comment" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          )
        }}
      </AddCommentMutation>

    )
  }
}
