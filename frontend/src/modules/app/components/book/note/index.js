// @flow
import * as React from 'react'
import { noteWithData } from './container'
import { compose } from 'react-apollo'
import { Link } from 'react-router-dom'

import errorWrapper from 'modules/error_wrapper'
import loadingWrapper from 'modules/loading_wrapper'

import type { ElementWithInfoProps } from 'modules/app/components/book/chapter/element'
import { ElementWithInfo } from 'modules/app/components/book/chapter/element'
import Note, { type NoteProps } from 'modules/app/components/book/notes/note'

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
      note: NoteProps & {
        element: ElementWithInfoProps,
        user: UserProps
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
            <ElementWithInfo {...note.element} className="element" />

            <Note {...note} />

            <CommentBox noteID={note.id} />
          </div>
        </div>
      </div>
    )
  }
}

type CommentBoxProps = {
  noteID: number
}

class CommentBox extends React.Component<CommentBoxProps> {
  render() {
    return (
      <form className="comment-box">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Leave a comment..." />
        </div>
      </form>
    )
  }
}

export const WrappedNote = compose(noteWithData)(errorWrapper(loadingWrapper(BookNote)))
export { BookNote }
