import React, { FunctionComponent, useState } from "react";
import Gravatar from "react-gravatar";
import { useMutation } from "@apollo/client";

import CurrentUserContext from "components/CurrentUser/context";

import { Comment as CommentType } from "../../../graphql/types";
import createCommentMutation from "../../../graphql/queries/mutations/AddCommentMutation";

type CommentFormProps = {
  addComment(comment: CommentType): void;
  noteId: string;
};

type CreateCommentVariables = {
  noteId: string;
  text: string;
};

type CreateCommentData = {
  addComment: CommentType;
};

const CommentForm: FunctionComponent<CommentFormProps> = ({
  noteId,
  addComment,
}) => {
  const [text, setText] = useState<string>("");

  const [createComment] = useMutation<
    CreateCommentData,
    CreateCommentVariables
  >(createCommentMutation);

  const submit = () => {
    createComment({ variables: { noteId, text } }).then((response) => {
      if (response.data) {
        setText("");
        addComment(response.data.addComment);
      }
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
            submit();
          }}
          className="my-4"
        >
          <div className="flex">
            <div className="w-34 p-4">
              <CurrentUserContext.Consumer>
                {(user) =>
                  user ? (
                    <Gravatar email={user.email} className="rounded-full" />
                  ) : null
                }
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
