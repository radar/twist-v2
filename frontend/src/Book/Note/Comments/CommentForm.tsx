import * as React from "react";
import Gravatar from "react-gravatar";
import { Mutation, MutationFn } from "react-apollo";

import CurrentUserContext from "../../../CurrentUser/context";

import { CommentProps } from "./Comment";
import commentsQuery from "./CommentsQuery";
import addCommentMutation from "./AddCommentMutation";

type CommentFormProps = {
  updateComments(comments: CommentProps[]): void;
  noteId: string;
};

type CommentFormState = {
  text: string;
};

interface AddCommentMutationData {
  noteId: string;
  text: string;
}

class AddCommentMutation extends Mutation<AddCommentMutationData, {}> {}

type CacheData = {
  comments: CommentProps[];
};

export default class CommentForm extends React.Component<
  CommentFormProps,
  CommentFormState
> {
  submit(addComment: MutationFn) {
    addComment({
      variables: { noteId: this.props.noteId, text: this.state.text },
      update: (store, { data: { addComment } }) => {
        const cacheData = store.readQuery({
          query: commentsQuery,
          variables: { noteId: this.props.noteId }
        });
        if (cacheData) {
          const comments = (cacheData as CacheData).comments.concat([
            addComment
          ]);
          store.writeQuery({
            query: commentsQuery,
            data: { comments: comments }
          });

          this.props.updateComments(comments);
        }
      }
    });
  }

  render() {
    return (
      <AddCommentMutation mutation={addCommentMutation}>
        {(addComment, { data }) => {
          return (
            <div className="mb-10">
              <div className="w-full">
                <div>
                  <strong>Add a comment</strong>
                </div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    this.submit(addComment);
                  }}
                  className="my-4"
                >
                  <div className="flex">
                    <div className="w-34 p-4">
                      <CurrentUserContext.Consumer>
                        {user =>
                          user ? <Gravatar email={user.email} /> : null
                        }
                      </CurrentUserContext.Consumer>
                    </div>
                    <textarea
                      className="w-full p-4"
                      placeholder="Leave a comment"
                      onChange={e => this.setState({ text: e.target.value })}
                    ></textarea>
                  </div>

                  <input
                    className="btn btn-blue float-right mt-2"
                    type="submit"
                    value="Comment"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </AddCommentMutation>
    );
  }
}
