import React, { FunctionComponent, useState } from "react";
import Gravatar from "react-gravatar";
import { useMutation } from "@apollo/react-hooks";

import CurrentUserContext from "../../../CurrentUser/context";

import { Comment as CommentProps } from "../../Notes/types";
import commentsQuery from "./CommentsQuery";
import addCommentMutation from "./AddCommentMutation";

type CommentFormProps = {
  updateComments(comments: CommentProps[]): void;
  noteId: string;
};

type CacheData = {
  comments: CommentProps[];
};

const CommentForm: FunctionComponent<CommentFormProps> = (props) => {
  const { noteId, updateComments } = props;
  const [text, setText] = useState<string>("");

  const [addComment, { data }] = useMutation(addCommentMutation);

  const submit = () => {
    addComment({
      variables: { noteId: noteId, text: text },
      update: (store, { data: { addComment } }) => {
        const cacheData = store.readQuery({
          query: commentsQuery,
          variables: { noteId: noteId },
        });
        if (cacheData) {
          const comments = (cacheData as CacheData).comments.concat([
            addComment,
          ]);
          store.writeQuery({
            query: commentsQuery,
            data: { comments: comments },
          });

          setText("");
          updateComments(comments);
        }
      },
    });
  };

  return (
    <div className="mb-10">
      <div className="w-full">
        <div>
          <strong>Add a comment</strong>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addComment();
          }}
          className="my-4"
        >
          <div className="flex">
            <div className="w-34 p-4">
              <CurrentUserContext.Consumer>
                {(user) => (user ? <Gravatar email={user.email} /> : null)}
              </CurrentUserContext.Consumer>
            </div>
            <textarea
              className="w-full p-4"
              placeholder="Leave a comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
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
};

export default CommentForm;
