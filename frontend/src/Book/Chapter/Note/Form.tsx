import React, { Component } from "react";
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import submitNoteMutation from "./SubmitNoteMutation";
import { Mutation, MutationFn } from "react-apollo";

type FormProps = {
  bookId: string;
  elementId: string;
  submitNote?: MutationFn;
  noteSubmitted: Function;
};

type FormState = {
  showThanks: boolean;
  text: string;
};

interface SubmitNoteMutationData {}

class SubmitNoteMutation extends Mutation<SubmitNoteMutationData, {}> {}

export class Form extends Component<FormProps, FormState> {
  state = {
    showThanks: false,
    text: ""
  };

  submit = () => {
    const { submitNote, bookId, elementId, noteSubmitted } = this.props;
    // This is not passed in during storybook, but is everywhere else
    if (submitNote) {
      submitNote({
        variables: { bookId, elementId, text: this.state.text },
        update: (store, data) => {
          noteSubmitted();
        }
      });
    }
  };

  render() {
    const { elementId } = this.props;
    return (
      <div>
        <form className="border rounded bg-gray-100 p-2 mb-2">
          <p>
            <label
              htmlFor={`element_${elementId}_note`}
              className="block font-bold mb-2"
            >
              Leave a note (Markdown enabled)
            </label>
            <textarea
              className="w-full border p-2"
              id={`element_${elementId}_note`}
              onChange={e => this.setState({ text: e.target.value })}
            />
          </p>

          <div className="btn btn-blue" onClick={this.submit}>
            Leave Note
          </div>
        </form>
        {this.renderThanks()}
      </div>
    );
  }

  renderThanks() {
    if (!this.state.showThanks) {
      return;
    }
    return (
      // <ReactCSSTransitionGroup
      //   transitionName="example"
      //   transitionEnterTimeout={500}
      //   transitionLeaveTimeout={3000}
      // >
      <div key="thanks">Thank you for submitting a note!</div>
      // </ReactCSSTransitionGroup>
    );
  }

  showThanks() {
    this.setState({ showThanks: true });
  }
}

type WrappedFormProps = {
  bookId: string;
  elementId: string;
  noteSubmitted: Function;
};

export default class WrappedForm extends React.Component<WrappedFormProps> {
  render() {
    return (
      <SubmitNoteMutation mutation={submitNoteMutation}>
        {(submitNote, { data }) => (
          <Form {...this.props} submitNote={submitNote} />
        )}
      </SubmitNoteMutation>
    );
  }
}
