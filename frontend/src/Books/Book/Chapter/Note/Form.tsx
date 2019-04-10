import React, { Component } from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import submitNoteMutation from './SubmitNoteMutation'
import { Mutation, MutationFn } from 'react-apollo'

type FormProps = {
  bookId: string,
  elementId: string,
  submitNote?: MutationFn,
  noteSubmitted: Function,
}

type FormState = {
  showThanks: boolean,
  text: string
}

interface SubmitNoteMutationData {
}

class SubmitNoteMutation extends Mutation<SubmitNoteMutationData, {}> {}

export class Form extends Component<FormProps, FormState> {
  state = {
    showThanks: false,
    text: ''
  }

  submit = (e: React.FormEvent) => {
    const {submitNote, bookId, elementId, noteSubmitted} = this.props
    // This is not passed in during storybook, but is everywhere else
    if (submitNote) {
      submitNote({
        variables: { bookId, elementId, text: this.state.text },
        update: (store, data) => { noteSubmitted(e) }
      })
    }
  }

  render() {
    const {elementId} = this.props
    return (
      <div>
        <form className="simple_form note_form">
          <p>
            <label htmlFor={`element_${elementId}_note`}>Leave a note (Markdown enabled)</label>
            <textarea
              className="text required form-control"
              id={`element_${elementId}_note`}
              onChange={e => this.setState({ text: e.target.value })}
            />
          </p>

          <div className="btn btn-primary" onClick={this.submit}>
            Leave Note
          </div>
        </form>
        {this.renderThanks()}
      </div>
    )
  }

  renderThanks() {
    if (!this.state.showThanks) {
      return
    }
    return (
      // <ReactCSSTransitionGroup
      //   transitionName="example"
      //   transitionEnterTimeout={500}
      //   transitionLeaveTimeout={3000}
      // >
        <div key="thanks">Thank you for submitting a note!</div>
      // </ReactCSSTransitionGroup>
    )
  }

  showThanks() {
    this.setState({ showThanks: true })
  }
}

type WrappedFormProps = {
  bookId: string,
  elementId: string,
  noteSubmitted: Function,
}

export default class WrappedForm extends React.Component<WrappedFormProps> {
  render() {
    return (
      <SubmitNoteMutation mutation={submitNoteMutation}>
          {(submitNote, { data }) => (
            <Form {...this.props} submitNote={submitNote} />
          )}
      </SubmitNoteMutation>
    )
  }
}
