import React from "react";
import { Link, RouteComponentProps } from "@reach/router";

import { useBooksQuery, BooksQuery } from "../graphql/types";
import QueryWrapper from "../QueryWrapper";

type Book = BooksQuery["books"][0];

const BookItem: React.FC<Book> = ({ permalink, title, blurb }) => {
  return (
    <div className="mb-4">
      <h2>
        <Link to={`/books/${permalink}`}>{title}</Link>
      </h2>
      <span className="text-gray-800">{blurb}</span>
    </div>
  );
};

type BooksProps = {
  books: BooksQuery["books"];
};

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

const WrappedBooks: React.FC<RouteComponentProps> = () => {
  const { data, loading, error } = useBooksQuery();

  const renderBooks = (data: BooksQuery) => {
    return <Books books={data.books}></Books>;
  };
  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderBooks(data)}
    </QueryWrapper>
  );
};

export default WrappedBooks;
