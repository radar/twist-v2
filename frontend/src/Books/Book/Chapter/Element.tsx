import React, { Component } from 'react'
import NoteForm from './Note/Form'
import * as styles from './Element.module.scss'

export type BareElementProps = {
  bookId: string,
  id: string,
  content: string,
  tag: string,
  image?: {
    path: string
  }
}

export class BareElement extends Component<BareElementProps> {
  createMarkup() {
    return { __html: this.props.content }
  }

  render() {
    const { tag, image, id } = this.props
    if (tag === 'img' && image) {
      return (
        <div className="element image" id={id}>
          <img src={image.path} />
        </div>
      )
    }

    return <div className="element" id={id} dangerouslySetInnerHTML={this.createMarkup()} />
  }
}


type ElementState = {
  showForm: boolean,
  noteCount: number
}

export type ElementProps = BareElementProps & {
  noteCount: number
}

export default class Element extends Component<ElementProps, ElementState> {
  state = {
    showForm: false,
    noteCount: this.props.noteCount
  }

  renderNotesCount() {
    const count = this.state.noteCount
    return count === 1 ? '1 note +' : `${count} notes +`
  }

  toggleForm = (e: React.FormEvent) => {
    e.preventDefault()
    this.setState({ showForm: !this.state.showForm })
  }

  noteSubmitted = (e: React.FormEvent) => {
    this.toggleForm(e)
    this.setState({ noteCount: this.state.noteCount + 1 })
  }

  renderForm() {
    if (!this.state.showForm) {
      return
    }
    return <NoteForm
      bookId={this.props.bookId}
      noteSubmitted={this.noteSubmitted}
      elementId={this.props.id}
    />
  }

  render() {
    const { id, tag } = this.props
    return (
      <div>
        <a id={id} />
        <span className={`${styles.note_button} note_button_${tag}`} id={`note_button_${id}`}>
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
