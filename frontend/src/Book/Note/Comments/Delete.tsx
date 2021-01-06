import React, { FunctionComponent, useState } from "react";
import { useMutation } from "react-apollo";

import CurrentUserContext from "../../../CurrentUser/context";
import { User } from "../../../graphql/types";

import deleteCommentMutation from "./DeleteCommentMutation";

type DeleteProps = {
  id: string;
  user: User;
  hideComment: () => void;
};

const Delete: FunctionComponent<DeleteProps> = ({ user, id, hideComment }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(
    false
  );

  const [deleteComment, { data }] = useMutation(deleteCommentMutation);

  const renderDeleteButton = () => {
    return (
      <CurrentUserContext.Consumer>
        {(currentUser) => {
          if (user.id != currentUser!.id) {
            return;
          }

          return (
            <button
              className="btn btn-red"
              onClick={() => {
                setShowDeleteConfirmation(true);
              }}
            >
              Delete
            </button>
          );
        }}
      </CurrentUserContext.Consumer>
    );
  };

  const renderDeleteConfirmation = () => {
    if (showDeleteConfirmation) {
      return (
        <div className="text-red-800 mt-4">
          <hr />
          <div className="mt-4">
            Are you sure you want to delete this comment?
          </div>
          <div className="mt-4">
            <div
              className="btn btn-green mr-2"
              onClick={() => {
                deleteComment({ variables: { id } }).then((response) => {
                  hideComment();
                });
              }}
            >
              Yes
            </div>
            <div
              className="btn btn-red"
              onClick={() => {
                setShowDeleteConfirmation(false);
              }}
            >
              No
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {renderDeleteButton()}
      {renderDeleteConfirmation()}
    </>
  );
};

export default Delete;
