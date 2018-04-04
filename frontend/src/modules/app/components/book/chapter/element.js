import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NoteForm extends React.Component {
  render() {
    const elementID = this.props.elementID
    return (
      <form className="simple_form note_form">
        <p>
          <label htmlFor={`element_${elementID}_note`}>Leave a note (Markdown enabled)</label>
          <textarea
            className="text required form-control"
            id={`element_${elementID}_note`}
            onChange={this.commentChanged}
          />
        </p>
        <p>
          <input type="submit" name="commit" value="Leave Note" className="btn btn-primary" />
        </p>
      </form>
    )
  }
}

NoteForm.propTypes = {
  elementID: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired
}

class Element extends Component {
  constructor() {
    super()

    this.state = {
      showForm: false,
      showThanks: false
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
    this.setState({ showThanks: false, showForm: !this.state.showForm })
    if (e) {
      e.preventDefault()
    }
  }

  renderThanks() {}

  noteSubmitted(notesCount) {
    this.toggleForm()
    this.setState({ showThanks: true, notesCount: notesCount })
  }

  renderForm() {
    if (!this.state.showForm) {
      return
    }
    return <NoteForm noteSubmitted={this.noteSubmitted} elementID={this.props.id} />
  }

  render() {
    const { id, tag } = this.props
    const notesCount = 0
    return (
      <div>
        <a name={id} />
        <span className={`note_button note_button_${tag}`} id={`note_button_${id}`}>
          <a href="#" onClick={this.toggleForm}>
            {this.renderNotesCount(notesCount)}
          </a>
        </span>
        <div className="element" dangerouslySetInnerHTML={this.createMarkup()} />
        {this.renderThanks()}
        {this.renderForm()}
      </div>
    )
  }
}

Element.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string,
  tag: PropTypes.string.isRequired
}

export default Element
