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

type Reader = ReadersType[0];

type ReaderItemProps = Reader & {
  index: number;
};
const ReaderItem: React.FC<ReaderItemProps> = ({
  githubLogin,
  name,
  author,
  index,
}: ReaderItemProps) => {
  const authorSuffix = <span className="text-green-600 font-bold">Author</span>;

  return (
    <li key={index}>
      {githubLogin} ({name}) {author && authorSuffix}
    </li>
  );
};

const Readers: React.FC<ReadersProps> = ({ readers }) => {
  const sortReaders = (readerA: Reader, readerB: Reader) =>
    (readerA.githubLogin as string)
      .toLowerCase()
      .localeCompare((readerB.githubLogin as string).toLowerCase());

  const filteredReaders = readers
    .filter((reader) => !reader.author)
    .sort(sortReaders);
  const authors = readers.filter((reader) => reader.author).sort(sortReaders);

  return (
    <div className="main md:w-1/3">
      <h1>Authors</h1>

      <ul className="list-disc list-inside">
        {authors.map((reader, index) => (
          <ReaderItem {...reader} key={reader.id} index={index} />
        ))}
      </ul>

      <h1>Readers</h1>

      <ul className="list-disc list-inside">
        {filteredReaders.map((reader, index) => (
          <ReaderItem {...reader} key={reader.id} index={index} />
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
