import * as React from "react";

import QueryWrapper from "../../QueryWrapper"

import {ElementWithNotesProps} from "./types"
import ElementWithNotes from "./ElementWithNotes"
import NotesQuery from "./NotesQuery"

type NoteListProps = {
  elementsWithNotes: ElementWithNotesProps[],
}

class NoteList extends React.Component<NoteListProps> {
  renderElements() {
    return this.props.elementsWithNotes.map(
      element => <ElementWithNotes key={element.id} {...element} />
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
            <NoteList elementsWithNotes={elementsWithNotes} />
          )
        }}
      </QueryWrapper>
    )
  }
}
