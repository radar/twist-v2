import React, { Component } from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import submitNoteMutation from './SubmitNoteMutation'
import { Mutation, MutationFn, FetchResult } from 'react-apollo'

type FormProps = {
  elementId: string,
  submitNote: MutationFn,
  noteSubmitted: Function,
}

type FormState = {
  showThanks: boolean,
  text: string
}

interface SubmitNoteMutationData {
}

class SubmitNoteMutation extends Mutation<SubmitNoteMutationData, {}> {}

class Form extends Component<FormProps, FormState> {
  state = {
    showThanks: false,
    text: ''
  }

  submit = () => {
    const {submitNote, elementId, noteSubmitted} = this.props
    submitNote({
      variables: { elementId, text: this.state.text },
      update: (store, data) => { noteSubmitted() }
    })
  }

  render() {
    const {elementId, submitNote} = this.props
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
