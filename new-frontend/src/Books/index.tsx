import React from 'react'
import { Query } from "react-apollo";

import booksQuery from './booksQuery'
import BookItem from './BookItem'

interface Book {
  id: string,
  title: string,
  permalink: string,
  blurb: string
}

interface BooksProps {
  books: Book[]
}

class Books extends React.Component<BooksProps> {
  render() {
    return (
      <div className="row">
        <div className="main col-md-7" id="books">
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
      <Query query={booksQuery}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return <Books books={data.books} />
        }}
      </Query>
    )
  }
}
