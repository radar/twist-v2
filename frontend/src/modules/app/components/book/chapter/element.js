// @flow
import React, { Component } from 'react'
import NoteForm from './note_form'

type ElementProps = {
  id: string,
  content: string,
  tag: string,
  noteCount: number
}

type ElementState = {
  showForm: boolean,
  noteCount: number
}

class Element extends Component<ElementProps, ElementState> {
  constructor() {
    super()

    this.state = {
      showForm: false,
      noteCount: this.props.noteCount
    }
  }

  createMarkup() {
    return { __html: this.props.content }
  }

  renderNotesCount() {
    const count = this.state.noteCount
    return count === 1 ? '1 note +' : `${count} notes +`
  }

  toggleForm = (e: ?Function) => {

    this.setState({ showForm: !this.state.showForm })
    if (e) {
      e.preventDefault()
    }
  }

  noteSubmitted(noteCount: number) {
    this.toggleForm()
    this.setState({ noteCount: noteCount })
  }

  renderForm() {
    if (!this.state.showForm) {
      return
    }
    return <NoteForm noteSubmitted={this.noteSubmitted} elementID={this.props.id} />
  }

  render() {
    const { id, tag, noteCount } = this.props
    return (
      <div>
        <a name={id} />
        <span className={`note_button note_button_${tag}`} id={`note_button_${id}`}>
          <a href="#" onClick={this.toggleForm}>
            {this.renderNotesCount()}
          </a>
        </span>
        <div className="element" dangerouslySetInnerHTML={this.createMarkup()} />
        {this.renderForm()}
      </div>
    )
  }
}

export default Element
