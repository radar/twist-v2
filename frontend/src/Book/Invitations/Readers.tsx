import { gql } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import {
  ReadersQuery,
  RemoveReaderMutationFn,
  useReadersQuery,
  useRemoveReaderMutation,
} from "../../graphql/types";
import PermissionDenied from "../../PermissionDenied";
import QueryWrapper from "../../QueryWrapper";

gql`
  query readers($permalink: String!) {
    book(permalink: $permalink) {
      ... on PermissionDenied {
        error
      }

      ... on Book {
        id
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

gql`
  mutation removeReader($bookId: ID!, $userId: ID!) {
    removeReader(bookId: $bookId, userId: $userId) {
      bookId
      userId
    }
  }
`;

type ReadersQueryBook = Extract<ReadersQuery["book"], { __typename: "Book" }>;
type ReadersType = ReadersQueryBook["readers"];

type ReadersProps = {
  readers: ReadersType;
  removeReader: RemoveReaderMutationFn;
};

const Readers: React.FC<ReadersProps> = ({ readers, removeReader }) => {
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
          <ReaderItem
            {...reader}
            key={reader.id}
            index={index}
            removeReader={removeReader}
          />
        ))}
      </ul>

      <h1>Readers</h1>

      <ul className="list-disc list-inside">
        {filteredReaders.map((reader, index) => (
          <ReaderItem
            {...reader}
            key={reader.id}
            index={index}
            removeReader={removeReader}
          />
        ))}
      </ul>
    </div>
  );
};

type Reader = ReadersType[0];

type ReaderItemProps = Reader & {
  index: number;
  removeReader: RemoveReaderMutationFn;
};
const ReaderItem: React.FC<ReaderItemProps> = ({
  id,
  githubLogin,
  name,
  author,
  index,
  removeReader: useRemoveReader,
}: ReaderItemProps) => {
  const authorSuffix = <span className="text-green-600 font-bold">Author</span>;

  const useUseRemoveReader = () => {
    useRemoveReader({ variables: { bookId: "1", userId: id } });
  };

  return (
    <li key={index}>
      {githubLogin} ({name}) {author && authorSuffix}{" "}
      <FontAwesomeIcon
        icon={faTimesCircle}
        size="1x"
        className="btn-red"
        flip="horizontal"
        onClick={useUseRemoveReader}
      />
    </li>
  );
};

type WrappedReadersProps = {
  bookPermalink: string;
};

const WrappedReaders: React.FC<WrappedReadersProps> = ({ bookPermalink }) => {
  const [removeReader] = useRemoveReaderMutation({
    refetchQueries: ["readers"],
  });
  const { data, loading, error } = useReadersQuery({
    variables: { permalink: bookPermalink },
  });

  const renderReadersOrPermissionDenied = (data: ReadersQuery) => {
    if (data.book.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    return <Readers readers={data.book.readers} removeReader={removeReader} />;
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderReadersOrPermissionDenied(data)}
    </QueryWrapper>
  );
};

export default WrappedReaders;
