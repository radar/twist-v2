// @flow
import React, { Component } from 'react'
import { compose } from 'react-apollo'

import errorWrapper from 'modules/error_wrapper'
import loadingWrapper from 'modules/loading_wrapper'
import { ElementWithInfo } from 'modules/app/components/book/chapter/element'
import type { ElementWithInfoProps } from 'modules/app/components/book/chapter/element'

import Note, { type NoteProps } from './note'
import { elementsWithData } from './elements_query'

type ElementProps = ElementWithInfoProps & {
  bookPermalink: string,
  goToNote: Function,
  notes: Array<NoteProps>
}

type NoteListProps = {
  state: string,
  bookPermalink: string,
  data: {
    elements: Array<ElementProps>
  },
  goToNote: Function
}

class NoteList extends Component<NoteListProps> {
  render() {
    const { data: { elements }, bookPermalink, state, goToNote } = this.props

    if (elements.length === 0) {
      return <div>There are no {state} notes to show for this book.</div>
    }

    return elements.map(element => (
      <Element {...element} bookPermalink={bookPermalink} goToNote={goToNote} key={element.id} />
    ))
  }
}

class Element extends Component<ElementProps> {
  render() {
    const { bookPermalink, notes, goToNote } = this.props

    return (
      <div className="row">
        <div className="col-md-7">
          <ElementWithInfo {...this.props} />

          {notes.map(note => (
            <Note
              {...note}
              bookPermalink={bookPermalink}
              key={note.id}
              onClick={e => {
                goToNote(note.id)
              }}
            />
          ))}
        </div>
      </div>
    )
  }
}

export const WrappedNoteList = compose(elementsWithData)(errorWrapper(loadingWrapper(NoteList)))
