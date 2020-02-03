import React from "react";
import { RouteComponentProps } from "@reach/router";
import QueryWrapper from "../QueryWrapper";

import booksQuery from "./booksQuery";
import BookItem, { Book } from "./BookItem";

import * as styles from "./Books.module.scss";

interface BooksProps {
  books: Book[];
}

export class Books extends React.Component<BooksProps> {
  render() {
    return (
      <div className={`${styles.main} col-md-7`} id="books">
        <h1>Your Books</h1>

        {this.props.books.map(book => (
          <BookItem {...book} key={book.id} />
        ))}
      </div>
    );
  }
}

interface WrappedBooksProps extends RouteComponentProps {}

export default class WrappedBooks extends React.Component<
  WrappedBooksProps,
  {}
> {
  render() {
    return (
      <QueryWrapper query={booksQuery}>
        {({ books }: BooksProps) => {
          return <Books books={books} />;
        }}
      </QueryWrapper>
    );
  }
}
