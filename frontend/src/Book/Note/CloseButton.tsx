import * as React from "react";
import { Mutation, MutationFn } from "react-apollo";
import closeNoteMutation from "./CloseNoteMutation";
import ButtonProps from "./ButtonProps";

interface CloseNoteMutationData {
  data: {
    closeNote: {
      id: string;
      state: string;
    };
  };
}

class CloseNoteMutation extends Mutation<CloseNoteMutationData, {}> {}

export default class extends React.Component<ButtonProps> {
  close(closeNoteMut: MutationFn) {
    closeNoteMut({ variables: { id: this.props.id } }).then(result => {
      if (result) {
        const {
          data: {
            closeNote: { state }
          }
        } = result;
        this.props.updateState(state);
      }
    });
  }

  render() {
    return (
      <CloseNoteMutation mutation={closeNoteMutation}>
        {(closeNote, { data }) => (
          <button
            className="btn btn-red"
            onClick={() => {
              this.close(closeNote);
            }}
          >
            Close
          </button>
        )}
      </CloseNoteMutation>
    );
  }
}
