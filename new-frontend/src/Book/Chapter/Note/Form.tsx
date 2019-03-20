import React, { Component } from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import submitNoteMutation from './SubmitNoteMutation'
import { Mutation, MutationFn, FetchResult } from 'react-apollo'

type FormProps = {
  elementID: string,
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
    this.props.submitNote()
  }

  render() {
    const {elementID, submitNote} = this.props
    return (
      <div>
        <form className="simple_form note_form">
          <p>
            <label htmlFor={`element_${elementID}_note`}>Leave a note (Markdown enabled)</label>
            <textarea
              className="text required form-control"
              id={`element_${elementID}_note`}
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

  // async _submit() {
  //   await this.props.noteMutation({
  //     variables: {
  //       elementID: this.props.elementID,
  //       text: this.state.text
  //     }
  //   })

  //   this.setState({ showThanks: true })
  // }
}

type WrappedFormProps = {
  elementID: string,
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
