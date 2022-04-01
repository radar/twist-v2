import React from "react";
import QueryWrapper from "components/QueryWrapper";

import Book from "components/book/Book";
import PermissionDenied from "components/PermissionDenied";
import { BookQuery, useBookQuery } from "graphql/types";
import { useRouter } from "next/router";

export type BookData = Extract<BookQuery["result"], { __typename?: "Book" }>;

const WrappedBook = () => {
  const router = useRouter();
  const { bookPermalink, ref } = router.query;
  const { data, loading, error } = useBookQuery({
    variables: { permalink: bookPermalink as string, gitRef: ref as string },
  });

  const renderBook = (data: BookQuery) => {
    if (data.result.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    const book = data.result;

    return <Book {...book} gitRef={ref as string} />;
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderBook(data)}
    </QueryWrapper>
  );
};

export default WrappedBook;

WrappedBook.auth = true;
