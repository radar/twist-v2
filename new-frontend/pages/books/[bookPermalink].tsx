import React from "react";
import Link from "next/link";

import QueryWrapper from "components/QueryWrapper";

import ChapterLink from "components/ChapterLink";
import PermissionDenied from "components/PermissionDenied";
import CommitInfo from "components/Commit";
import {
  BookQuery,
  ChapterFieldsFragment,
  useBookQuery,
} from "graphql/types";
import { useRouter } from "next/router";

export type BookData =
  Extract<BookQuery["result"], { __typename?: "Book" }>
type Chapters = readonly ChapterFieldsFragment[];

type BookProps = BookData & {
  gitRef?: string;
};

export const Book: React.FC<BookProps> = ({
  title,
  commit,
  latestCommit,
  permalink,
  currentUserAuthor,
}) => {
  const renderPart = (title: string, chapters: Chapters) => {
    if (chapters.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
        <h3>{title}</h3>
        <ol className="{{title.toLowerCase()}} list-decimal list-inside">
          {chapters.map((chapter) => (
            <ChapterLink
              {...chapter}
              bookPermalink={permalink}
              key={chapter.id}
            />
          ))}
        </ol>
      </div>
    );
  };

  const { frontmatter, mainmatter, backmatter } = commit;

  const inviteAReader = (
    <>
      &middot;{" "}
      <Link href={`/books/${permalink}/invite`}>
        Invite a reader
      </Link>
    </>
  );

  return (
    <div>
      <h1>{title}</h1>
      <CommitInfo
        permalink={permalink}
        commit={commit}
        latestCommit={latestCommit}
      />
      <div className="mb-4">
        <Link href={`/books/${permalink}/notes`}>
          Notes for this book
        </Link>{" "}
        &middot;{" "}
        <Link href={`/books/${permalink}/branches`}>
          Branches
        </Link>{" "}
        {currentUserAuthor && inviteAReader}
      </div>
      <hr />
      {renderPart("Frontmatter", frontmatter)}
      {renderPart("Mainmatter", mainmatter)}
      {renderPart("Backmatter", backmatter)}
    </div>
  );
};

type WrappedBookProps = {
  bookPermalink: string;
  gitRef: string;
};

const WrappedBook: React.FC<WrappedBookProps> = ({
  gitRef,
}) => {
  const router = useRouter()
  const { bookPermalink } = router.query
  const { data, loading, error } = useBookQuery({
    variables: { permalink: bookPermalink as string, gitRef: gitRef },
  });

  const renderBook = (data: BookQuery) => {
    if (data.result.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    const book = data.result;

    return <Book {...book} />;
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderBook(data)}
    </QueryWrapper>
  );
};

export default WrappedBook;
