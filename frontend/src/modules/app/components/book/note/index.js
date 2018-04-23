// @flow
import * as React from 'react'
import { noteWithData } from './container'
import { compose } from 'react-apollo'
import { Link } from 'react-router-dom'

import errorWrapper from 'modules/error_wrapper'
import loadingWrapper from 'modules/loading_wrapper'

import { BareElement } from 'modules/app/components/book/chapter/element'
import { Note } from 'modules/app/components/book/notes'

// TODO: One day I'll figure out how to import flow types...
type ElementProps = {
  id: string,
  content: string,
  tag: string,
  noteCount: number,
  image: {
    path: string
  }
}

type UserProps = {
  email: string,
  name: string
}

type BookNoteProps = {
  data: {
    book: {
      id: string,
      permalink: string,
      title: string,
      note: {
        id: number,
        element: ElementProps,
        createdAt: string,
        text: string,
        user: UserProps,
        onClick: ?Function,
      }
    }
  }
}

class BookNote extends React.Component<BookNoteProps> {
  render() {
    const { data: { book: { permalink, title, note } } } = this.props
    return (
      <div className="notes">
        <h1>
          <Link to={`/books/${permalink}`}>{title}</Link>
          - <Link to={`/books/${permalink}/notes`}>Notes</Link>
          - #{note.id}
        </h1>

        <div className="row">
          <div className="col-md-7">
            <BareElement {...note.element} className="element" />

            <Note {...note} />

            <CommentBox noteID={note.id} />
          </div>
        </div>
      </div>
    )
  }
}

type CommentBoxProps = {
  noteID: number,
}

class CommentBox extends React.Component<CommentBoxProps> {
  render () {
    return (
      <form className='comment-box'>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Leave a comment...' />
        </div>
      </form>
    )
  }
}

export default compose(noteWithData)(errorWrapper(loadingWrapper(BookNote)))
