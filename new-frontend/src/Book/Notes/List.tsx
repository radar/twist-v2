import * as React from "react";

import QueryWrapper from "../../QueryWrapper"

import {ElementWithNotesProps} from "./types"
import ElementWithNotes from "./ElementWithNotes"
import NotesQuery from "./NotesQuery"

type NoteListProps = {
  bookPermalink: string,
  elementsWithNotes: ElementWithNotesProps[],
}

export class NoteList extends React.Component<NoteListProps> {
  renderElements() {
    const {elementsWithNotes, bookPermalink} = this.props
    return elementsWithNotes.map(
      element => <ElementWithNotes key={element.id} bookPermalink={bookPermalink} {...element} />
    )
  }

  render() {
    return (
      <div>
        {this.renderElements()}
      </div>
    )
  }
}

type WrappedNoteListProps = {
  bookPermalink: string,
  state: string,
}

export default class WrappedNoteList extends React.Component<WrappedNoteListProps> {
  render() {
    const variables = {
      bookPermalink: this.props.bookPermalink,
      state: this.props.state,
    }


    return (
      <QueryWrapper query={NotesQuery} variables={variables}>
        {({elementsWithNotes}) => {
          return (
            <NoteList bookPermalink={this.props.bookPermalink} elementsWithNotes={elementsWithNotes} />
          )
        }}
      </QueryWrapper>
    )
  }
}
