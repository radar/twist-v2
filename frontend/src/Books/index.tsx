import React from "react";
import { RouteComponentProps } from "@reach/router";

import BookItem from "./BookItem";
import { useBooksQuery, BooksQuery } from "../graphql/types";
import QueryWrapper from "../QueryWrapper";

type BooksProps = {
  books: any;
};

export class Books extends React.Component<BooksProps> {
  renderBooks() {
    const { books } = this.props;
    if (books.length > 0) {
      return books.map((book: any) => <BookItem {...book} key={book.id} />);
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
