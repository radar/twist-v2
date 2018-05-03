// @flow
import React, { Component } from 'react'
import gravatar from 'gravatar'
import moment from 'moment'
import Markdown from 'react-remarkable'

import NoteStateOpen from './note_state_open'
import NoteStateClosed from './note_state_closed'

type GravatarProps = {
  email: string
}

class Gravatar extends Component<GravatarProps> {
  render() {
    return <img src={gravatar.url(this.props.email, { s: 40 })} />
  }
}

type UserProps = {
  email: string,
  name: string
}

export type NoteProps = {
  id: number,
  createdAt: string,
  text: string,
  state: string,
  user: UserProps,
  goToNote: ?Function
}

type NoteState = {
  state: string
}

export default class Note extends Component<NoteProps, NoteState> {
  state = {
    state: this.props.state
  }

  closeNote = () => {
    this.setState({ state: 'closed' })
  }

  openNote = () => {
    this.setState({ state: 'open' })
  }

  relativeTime() {
    const { createdAt } = this.props

    return moment(createdAt).fromNow()
  }

  renderStateTransitions() {
    const { state } = this.state

    if (state === 'open') {
      return <NoteStateOpen closeNote={this.closeNote} id={this.props.id} />
    } else {
      return <NoteStateClosed openNote={this.openNote} id={this.props.id} />
    }
  }

  renderTimestamp() {
    const { id, goToNote, user: { name } } = this.props
    const time = this.relativeTime()

    if (goToNote === undefined || goToNote === null) {
      return (
        <strong>
          {name} commented {time}
        </strong>
      )
    } else {
      return (
        <strong>
          {name}{' '}
          <a
            href="#"
            onClick={e => {
              e.preventDefault()
              goToNote(id)
            }}
          >
            {' '}
            commented {time} <small>(#{id})</small>
          </a>
        </strong>
      )
    }
  }

  render() {
    const { text, user: { email } } = this.props
    return (
      <div className="row note">
        <div className="avatar col-md-1">
          <Gravatar email={email} />
        </div>
        <div className="col-md-10 body">
          <div className="timestamp">{this.renderTimestamp()}</div>

          <Markdown source={text} />

          <div className="state">{this.renderStateTransitions()}</div>
        </div>
      </div>
    )
  }
}
