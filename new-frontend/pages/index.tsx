import React from "react";
import Link from "next/link";

import { useBooksQuery, BooksQuery } from "../graphql/types";
import QueryWrapper from "../components/QueryWrapper";
import { useSession } from "next-auth/react";

type Book = BooksQuery["books"][0];

const BookItem: React.FC<Book> = ({ permalink, title, blurb }) => {
  return (
    <div className="mb-4">
      <h2>
        <Link href={`/books/${permalink}`}>{title}</Link>
      </h2>
      <span className="text-gray-800">{blurb}</span>
    </div>
  );
};

type BooksProps = {
  books: BooksQuery["books"];
};

const Books = ({ books }: BooksProps) => {
  const renderBooks = () => {
    if (books.length > 0) {
      return books.map((book) => <BookItem {...book} key={book.id} />);
    }

    return (
      <div className="text-gray-600 italic">
        There are no books that you can see. Perhaps you need to ask someone
        nicely?
      </div>
    );
  };
  return (
    <div id="books">
      <h1>Books</h1>

      {renderBooks()}
    </div>
  );
};

const WrappedBooks = () => {
  const { status } = useSession({
    required: true,
  });

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

WrappedBooks.auth = true;
