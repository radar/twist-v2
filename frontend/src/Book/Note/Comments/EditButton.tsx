import React, { FunctionComponent } from "react";

import CurrentUserContext from "../../../CurrentUser/context";
import { User } from "../../../graphql/types";

type EditButtonProps = {
  showForm: boolean;
  user: User;
  toggleForm: () => void;
};

const EditButton: FunctionComponent<EditButtonProps> = ({
  user,
  showForm,
  toggleForm,
}) => {
  if (showForm) {
    return null;
  }

  return (
    <CurrentUserContext.Consumer>
      {(currentUser) => {
        if (user.id != currentUser!.id) {
          return;
        }

        return (
          <button className="btn btn-blue mr-2" onClick={toggleForm}>
            Edit
          </button>
        );
      }}
    </CurrentUserContext.Consumer>
  );
};

export default EditButton;
