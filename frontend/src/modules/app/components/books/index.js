// @flow
import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { Link } from 'react-router-dom'

import errorWrapper from 'modules/error_wrapper'
import loadingWrapper from 'modules/loading_wrapper'

import container from './container'

type BookItemProps = {
  title: string,
  permalink: string,
  blurb: string
}

class BookItem extends Component<BookItemProps> {
  render() {
    const { permalink, title, blurb } = this.props
    return (
      <div>
        <h2>
          <Link to={`/books/${permalink}`}>{title}</Link>
        </h2>
        <span className="blurb">{blurb}</span>
      </div>
    )
  }
}

type Book = {
  id: string,
  title: string,
  permalink: string,
  blurb: string
}

type BooksProps = {
  data: {
    books: Array<Book>
  }
}

class Books extends Component<BooksProps> {
  render() {
    const { data: { books } } = this.props

    return (
      <div className="row">
        <div className="main col-md-7" id="books">
          <h1>Your Books</h1>

          {books.map(book => <BookItem {...book} key={book.id} />)}
        </div>
      </div>
    )
  }
}

export const WrappedBooks = compose(container)(errorWrapper(loadingWrapper(Books)))
export { Books }
