import React, { FunctionComponent } from "react";
import closeNoteMutation from "../../graphql/queries/mutations/CloseNoteMutation";
import { useMutation } from "@apollo/client";
import ButtonProps from "./ButtonProps";

const CloseButton: FunctionComponent<ButtonProps> = (props) => {
  const [closeNote] = useMutation(closeNoteMutation);
  const close = () => {
    closeNote({ variables: { id: props.id } }).then((result) => {
      if (result) {
        const {
          data: {
            closeNote: { state },
          },
        } = result;
        props.setState(state);
      }
    });
  };

  return (
    <button className="btn btn-red" onClick={close}>
      Close
    </button>
  );
};

export default CloseButton;
