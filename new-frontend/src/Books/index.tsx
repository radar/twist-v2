import React from 'react'
import QueryWrapper from "../QueryWrapper";

import booksQuery from './BooksQuery'
import BookItem, { Book } from './BookItem'

import * as styles from './Books.module.scss'

interface BooksProps {
  books: Book[]
}

export class Books extends React.Component<BooksProps> {
  render() {
    return (
      <div className="row">
        <div className={`${styles.main} col-md-7`} id="books">
          <h1>Your Books</h1>

          {this.props.books.map(book => <BookItem {...book} key={book.id} />)}
        </div>
      </div>
    )
  }
}

export default class WrappedBooks extends React.Component<BooksProps, {}> {
  render() {
    return (
      <QueryWrapper query={booksQuery}>
        {({books}: BooksProps) => { return <Books books={books} /> }}
      </QueryWrapper>
    )
  }
}
