import { gql } from "@apollo/client";
import React from "react";
import { ReadersQuery, useReadersQuery } from "../../graphql/types";
import PermissionDenied from "../../PermissionDenied";
import QueryWrapper from "../../QueryWrapper";

gql`
  query readers($permalink: String!) {
    book(permalink: $permalink) {
      ... on PermissionDenied {
        error
      }

      ... on Book {
        readers {
          id
          author
          githubLogin
          name
        }
      }
    }
  }
`;

type ReadersQueryBook = Extract<ReadersQuery["book"], { __typename: "Book" }>;
type ReadersType = ReadersQueryBook["readers"];

type ReadersProps = {
  readers: ReadersType;
};

const Readers: React.FC<ReadersProps> = ({ readers }) => {
  const authorSuffix = <span className="text-green-600 font-bold">Author</span>;

  const sortedReaders = [...readers].sort((readerA, readerB) => {
    if (readerA.author && !readerB.author) return -1;
    return (readerA.githubLogin as string).localeCompare(
      readerB.githubLogin as string
    );
  });

  return (
    <div className="main md:w-1/3">
      <h1>Readers</h1>

      <ul className="list-disc list-inside">
        {sortedReaders.map(({ githubLogin, name, author }, index) => (
          <li key={index}>
            {githubLogin} ({name}) {author && authorSuffix}
          </li>
        ))}
      </ul>
    </div>
  );
};

type WrappedReadersProps = {
  bookPermalink: string;
};

const WrappedReaders: React.FC<WrappedReadersProps> = ({ bookPermalink }) => {
  const { data, loading, error } = useReadersQuery({
    variables: { permalink: bookPermalink },
  });

  const renderReadersOrPermissionDenied = (data: ReadersQuery) => {
    if (data.book.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    return <Readers readers={data.book.readers} />;
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderReadersOrPermissionDenied(data)}
    </QueryWrapper>
  );
};

export default WrappedReaders;
