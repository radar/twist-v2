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
  onClick: ?Function
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

  render() {
    const { text, user: { email, name } } = this.props
    return (
      <div className="row note" onClick={this.props.onClick}>
        <div className="avatar col-md-1">
          <Gravatar email={email} />
        </div>
        <div className="col-md-10 body">
          <div className="title">
            <strong>
              {name} commented {this.relativeTime()}
            </strong>
          </div>

          <div>
            <Markdown source={text} />
          </div>

          {this.renderStateTransitions()}
        </div>
      </div>
    )
  }
}
