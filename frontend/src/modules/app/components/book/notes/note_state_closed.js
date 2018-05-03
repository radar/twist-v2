// @flow
import React from 'react'
import { compose } from 'react-apollo'
import type { NoteProps } from './note'
import { openNoteMutation } from './open_note_mutation'

type NoteStateClosedProps = NoteProps & {
  openNote: Function,
  openNoteMutation: Function
}

class NoteStateClosed extends React.Component<NoteStateClosedProps> {
  async openNote() {
    this.props.openNote()

    await this.props.openNoteMutation({
      variables: {
        id: this.props.id
      }
    })
  }

  render() {
    return (
      <div>
        Note is closed.{' '}
        <button
          className="btn btn-success"
          onClick={(e) => {
            e.preventDefault()
            this.openNote()
          }}
        >
          Open
        </button>
      </div>
    )
  }
}

export default compose(openNoteMutation)(NoteStateClosed)
