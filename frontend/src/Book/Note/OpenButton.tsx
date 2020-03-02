import * as React from "react";
import { Mutation, MutationFn } from "react-apollo";
import openNoteMutation from "./OpenNoteMutation";
import ButtonProps from "./ButtonProps";

interface OpenNoteMutationData {
  data: {
    openNote: {
      id: string;
      state: string;
    };
  };
}

class OpenNoteMutation extends Mutation<OpenNoteMutationData, {}> {}

export default class extends React.Component<ButtonProps> {
  open(openNoteMut: MutationFn) {
    openNoteMut({ variables: { id: this.props.id } }).then(result => {
      if (result) {
        const {
          data: {
            openNote: { state }
          }
        } = result;
        this.props.updateState(state);
      }
    });
  }

  render() {
    return (
      <OpenNoteMutation mutation={openNoteMutation}>
        {(openNote, { data }) => (
          <button
            className="btn btn-green mt-4"
            onClick={() => {
              this.open(openNote);
            }}
          >
            Open
          </button>
        )}
      </OpenNoteMutation>
    );
  }
}
