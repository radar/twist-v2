import React from "react";
import { RouteComponentProps } from "@reach/router";
import QueryWrapper from "../QueryWrapper";

import booksQuery from "./booksQuery";
import BookItem, { Book } from "./BookItem";

interface BooksProps {
  books: Book[];
}

export class Books extends React.Component<BooksProps> {
  renderBooks() {
    const { books } = this.props;
    if (books.length > 0) {
      return books.map((book) => <BookItem {...book} key={book.id} />);
    }

    return (
      <div className="text-gray-600 italic">
        There are no books that you can see. Perhaps you need to ask someone
        nicely?
      </div>
    );
  }
  render() {
    return (
      <div className="main md:w-1/2" id="books">
        <h1>Books</h1>

        {this.renderBooks()}
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
