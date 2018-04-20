// @flow
import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { Link } from 'react-router-dom'
import gravatar from 'gravatar'
import moment from 'moment'
import Markdown from 'react-remarkable'

import { bookWithData } from './container'
import errorWrapper from 'modules/error_wrapper'
import loadingWrapper from 'modules/loading_wrapper'
import { BareElement } from 'modules/app/components/book/chapter/element'

type UserProps = {
  email: string,
  name: string,
}

type GravatarProps = {
  email: string,
}

type NoteProps = {
  id: number,
  createdAt: string,
  text: string,
  user: UserProps,
  bookPermalink: string
}

type ElementProps = {
  id: string,
  content: string,
  notes: Array<NoteProps>,
  noteCount: number,
  tag: string,
  bookPermalink: string,
  image: {
    path: string
  }
}

type NotesProps = {
  data: {
    book: {
      title: string,
      permalink: string,
      elements: Array<ElementProps>
    }
  }
}

class Notes extends Component<NotesProps> {
  render() {
    const { data: { book: { title, permalink, elements } } } = this.props

    return (
      <div>
        <h1>
          <Link to={`/books/${permalink}`}>{title}</Link> - Notes
        </h1>

        <div className="notes">
          {elements.map(element => (
            <Element {...element} bookPermalink={permalink} key={element.id} />
          ))}
        </div>
      </div>
    )
  }
}

class Element extends Component<ElementProps> {
  render() {
    const { bookPermalink, notes } = this.props

    return (
      <div className="row">
        <div className="col-md-7">
          <BareElement {...this.props} className="element" />

          {notes.map(note => <Note {...note} bookPermalink={bookPermalink} key={note.id} />)}
        </div>
      </div>
    )
  }
}

class Gravatar extends Component<GravatarProps> {
  render() {
    return <img src={gravatar.url(this.props.email, { s: 40 })} />
  }
}

class Note extends Component<NoteProps> {
  relativeTime() {
    const { createdAt } = this.props

    return moment(createdAt).fromNow()
  }

  render() {
    const { text, user: { email, name } } = this.props
    return (
      <div className="row note">
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
        </div>
      </div>
    )
  }
}

export default compose(bookWithData)(errorWrapper(loadingWrapper(Notes)))
