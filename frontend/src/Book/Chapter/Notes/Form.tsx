import React, { Component } from "react";
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import submitNoteMutation from "./SubmitNoteMutation";
import { Mutation, MutationFn } from "react-apollo";

import { Note } from "../../Notes/types";

type FormProps = {
  bookPermalink: string;
  elementId: string;
  submitNote?: MutationFn;
  noteSubmitted: (note: Note) => void;
};

type FormState = {
  showThanks: boolean;
  text: string;
};

interface SubmitNoteMutationData {
  submitNote: Note;
}

class SubmitNoteMutation extends Mutation<SubmitNoteMutationData, {}> {}

export class Form extends Component<FormProps, FormState> {
  state = {
    showThanks: false,
    text: ""
  };

  submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { submitNote, bookPermalink, elementId, noteSubmitted } = this.props;
    // This is not passed in during storybook, but is everywhere else
    if (submitNote) {
      submitNote({
        variables: { bookPermalink, elementId, text: this.state.text },
        update: (store, { data }) => {
          noteSubmitted((data as SubmitNoteMutationData).submitNote);
        }
      });
    }
  };

  render() {
    const { elementId } = this.props;
    return (
      <div>
        <form onSubmit={this.submit}>
          <p>
            <label
              htmlFor={`element_${elementId}_note`}
              className="block font-bold mb-2"
            >
              Leave a note (Markdown enabled)
            </label>
            <textarea
              className="w-full border p-2 mb-2"
              id={`element_${elementId}_note`}
              onChange={e => this.setState({ text: e.target.value })}
            />
          </p>

          <input
            type="submit"
            className="btn btn-blue mb-2"
            value="Submit Note"
          />
        </form>
      </div>
    );
  }
}

type WrappedFormProps = {
  bookPermalink: string;
  elementId: string;
  noteSubmitted: (note: Note) => void;
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
