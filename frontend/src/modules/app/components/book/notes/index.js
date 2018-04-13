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
  email: string
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
  bookPermalink: string
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

        {elements.map(element => (
          <Element {...element} bookPermalink={permalink} key={element.id} />
        ))}
      </div>
    )
  }
}

class Element extends Component<ElementProps> {
  render() {
    const { bookPermalink, notes } = this.props

    return (
      <div className="row">
        <div className="col-md-7 main element-group">
          <BareElement {...this.props} />
          <div className="notes">
            {notes.map(note => <Note {...note} bookPermalink={bookPermalink} key={note.id} />)}
          </div>
        </div>
      </div>
    )
  }
}

class Gravatar extends Component<UserProps> {
  render() {
    return <img src={gravatar.url(this.props.email)} />
  }
}

class Note extends Component<NoteProps> {
  relativeTime() {
    const { createdAt } = this.props

    return moment(createdAt).fromNow()
  }

  render() {
    const { id, text, user: { email }, bookPermalink } = this.props
    return (
      <div className="note row">
        <div className="avatar">
          <Gravatar email={email} />
        </div>
        <div className="col-md-10 comment-box">
          <div className="title">
            <Link to={`books/${bookPermalink}/notes/${id}`}>Note #{id}</Link>
            <br />
            <strong>
              {email} commented {this.relativeTime()}
            </strong>
          </div>

          <div className="body">
            <Markdown source={text} />
          </div>
        </div>
      </div>
    )
  }
}

export default compose(bookWithData)(errorWrapper(loadingWrapper(Notes)))
