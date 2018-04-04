import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NoteForm from './note_form'

class Element extends Component {
  constructor() {
    super()

    this.state = {
      showForm: false
    }

    this.toggleForm = this.toggleForm.bind(this)
    this.noteSubmitted = this.noteSubmitted.bind(this)
  }

  createMarkup() {
    return { __html: this.props.content }
  }

  renderNotesCount(count) {
    return count === 1 ? '1 note +' : `${count} notes +`
  }

  toggleForm(e) {
    this.setState({ showForm: !this.state.showForm })
    if (e) {
      e.preventDefault()
    }
  }

  noteSubmitted(notesCount) {
    this.toggleForm()
    this.setState({ notesCount: notesCount })
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
            {this.renderNotesCount(noteCount)}
          </a>
        </span>
        <div className="element" dangerouslySetInnerHTML={this.createMarkup()} />
        {this.renderForm()}
      </div>
    )
  }
}

Element.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string,
  tag: PropTypes.string.isRequired,
  noteCount: PropTypes.number.isRequired
}

export default Element
