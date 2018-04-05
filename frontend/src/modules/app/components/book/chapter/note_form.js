// @flow

import React, { Component } from 'react'
import { compose } from 'react-apollo'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { noteMutation } from './container'

type NoteFormProps = {
  elementID: string,
  noteMutation: function
}

type NoteFormState = {
  showThanks: boolean,
  text: string
}

class NoteForm extends Component<NoteFormProps, NoteFormState> {
  constructor() {
    super()

    this.state = {
      showThanks: false,
      text: ''
    }
  }

  render() {
    const elementID = this.props.elementID
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

          <div className="btn btn-primary" onClick={() => this._submit()}>
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
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={3000}
      >
        <div key="thanks">Thank you for submitting a note!</div>
      </ReactCSSTransitionGroup>
    )
  }

  showThanks() {
    this.setState({ showThanks: true })
  }

  async _submit() {
    await this.props.noteMutation({
      variables: {
        elementID: this.props.elementID,
        text: this.state.text
      }
    })

    this.setState({ showThanks: true })
  }
}

export default compose(noteMutation)(NoteForm)
