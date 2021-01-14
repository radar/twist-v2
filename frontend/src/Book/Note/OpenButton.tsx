import React, { FunctionComponent } from "react";
import openNoteMutation from "./OpenNoteMutation";
import { useMutation } from "@apollo/react-hooks";
import ButtonProps from "./ButtonProps";

const CloseButton: FunctionComponent<ButtonProps> = (props) => {
  const [openNote] = useMutation(openNoteMutation);
  const open = () => {
    openNote({ variables: { id: props.id } }).then((result) => {
      if (result) {
        const {
          data: {
            openNote: { state },
          },
        } = result;
        props.setState(state);
      }
    });
  };

  return (
    <button className="btn btn-green" onClick={open}>
      Open
    </button>
  );
};

export default CloseButton;
