// @flow
import React, { Component } from 'react'
import NoteForm from './note_form'

export type ElementProps = {
  id: string,
  content: string,
  tag: string,
  noteCount: number,
  image: {
    path: string
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
    const { tag, image, id } = this.props
    if (tag === 'img') {
      return (
        <div className="element image" id={id}>
          <img src={image.path} />
        </div>
      )
    }

    return <div className="element" id={id} dangerouslySetInnerHTML={this.createMarkup()} />
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
