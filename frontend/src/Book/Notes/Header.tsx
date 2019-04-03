import * as React from "react";
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

import QueryWrapper from "../../QueryWrapper"

import BookQuery from "./BookQuery"

type HeaderProps = {
  permalink: string,
  noteNumber?: number,
}

type Book = {
  permalink: string,
  title: string
}

export default class Header extends React.Component<HeaderProps> {

  renderSuffix(book: Book, noteNumber?: number) {
    const bookRoot = `/books/${book.permalink}`
    if (noteNumber) {
      return (
        <span>
          - <Link to={`${bookRoot}/notes`}>Notes</Link>
          - #{noteNumber}
        </span>
      )
    } else {
      return (
        <span>
            - Notes
        </span>
      )
    }
  }
  render() {

    const {permalink} = this.props;
    return (
      <QueryWrapper query={BookQuery} variables={{bookPermalink: permalink}}>
        {({book}) => {
          return (
            <h1>
              <Link to={`/books/${permalink}`}>{book.title}</Link> {this.renderSuffix(book, this.props.noteNumber)}
            </h1>
          )
        }}
      </QueryWrapper>
    )
  }
}
