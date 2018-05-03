// @flow
import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { Link } from 'react-router-dom'

import errorWrapper from 'modules/error_wrapper'
import loadingWrapper from 'modules/loading_wrapper'

import { bookWithData } from './book_query'

import { WrappedNoteList as NoteList } from './note_list'

type NotesProps = {
  history: {
    push: Function
  },
  data: {
    book: {
      title: string,
      permalink: string
    }
  }
}

type NotesState = {
  state: string
}

class Notes extends Component<NotesProps, NotesState> {
  state = {
    state: 'open'
  }

  goToNote = id => {
    const { history, data: { book: { permalink } } } = this.props
    history.push(`/books/${permalink}/notes/${id}`)
  }

  toggleState() {
    if (this.state.state === 'open') {
      this.setState({ state: 'closed' })
    } else {
      this.setState({ state: 'open' })
    }
  }

  renderStates() {
    const { state } = this.state
    return (
      <div className="btn-group current-state">
        <button
          className={'btn btn-outline-success ' + (state === 'open' ? 'active' : '')}
          onClick={() => this.toggleState()}
        >
          Open
        </button>
        <button
          className={'btn btn-outline-danger ' + (state === 'closed' ? 'active' : '')}
          onClick={() => this.toggleState()}
        >
          Closed
        </button>
      </div>
    )
  }

  render() {
    const { data: { book: { title, permalink } } } = this.props

    return (
      <div>
        <h1>
          <Link to={`/books/${permalink}`}>{title}</Link> - Notes
        </h1>

        <div className="notes">
          {this.renderStates()}

          <NoteList state={this.state.state} bookPermalink={permalink} goToNote={this.goToNote} />
        </div>
      </div>
    )
  }
}

export default compose(bookWithData)(errorWrapper(loadingWrapper(Notes)))
