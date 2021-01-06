import * as React from "react";
import { Link } from "@reach/router";

import QueryWrapper from "../../QueryWrapper";

import { NoteBookQuery, useNoteBookQuery } from "../../graphql/types";
import PermissionDenied from "../../PermissionDenied";

type HeaderProps = {
  permalink: string;
  noteNumber?: number;
};

type Book = Extract<NoteBookQuery["book"], { __typename?: "Book" }>;

const Header: React.FC<HeaderProps> = ({ permalink, noteNumber }) => {
  const renderSuffix = (book: Book, noteNumber?: number) => {
    const bookRoot = `/books/${book.permalink}`;
    if (noteNumber) {
      return (
        <span>
          - <Link to={`${bookRoot}/notes`}>Notes</Link>- #{noteNumber}
        </span>
      );
    } else {
      return <span>- Notes</span>;
    }
  };

  const { data, loading, error } = useNoteBookQuery({
    variables: { bookPermalink: permalink },
  });

  const renderBookHeader = ({ book }: NoteBookQuery) => {
    if (book.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    return (
      <h1>
        <Link to={`/books/${permalink}`}>{book.title}</Link>{" "}
        {renderSuffix(book, noteNumber)}
      </h1>
    );
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderBookHeader(data)}
    </QueryWrapper>
  );
};
export default Header;
