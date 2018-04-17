// @flow
import React, { Component } from 'react'
import NoteForm from './note_form'

type ElementProps = {
  id: string,
  content: string,
  tag: string,
  noteCount: number,
  image: {
    path: string,
  }
}

type ElementState = {
  showForm: boolean,
  noteCount: number
}

export class BareElement extends Component<ElementProps> {
  createMarkup() {
    return { __html: this.props.content }
  }

  render() {
    if (this.props.tag === 'img') {
      return (
        <div className="element image">
          <img src={this.props.image.path} />
        </div>
      )
    }

    return <div className="element" dangerouslySetInnerHTML={this.createMarkup()} />
  }
}

export class Element extends Component<ElementProps, ElementState> {
  constructor(props: ElementProps) {
    super(props)

    this.state = {
      showForm: false,
      noteCount: props.noteCount
    }
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
    const { id, tag } = this.props
    return (
      <div>
        <a name={id} />
        <span className={`note_button note_button_${tag}`} id={`note_button_${id}`}>
          <a href="#" onClick={this.toggleForm}>
            {this.renderNotesCount()}
          </a>
        </span>
        <BareElement {...this.props} />
        {this.renderForm()}
      </div>
    )
  }
}
