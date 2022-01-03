import React from "react";

import QueryWrapper from "../QueryWrapper";
import { Link, RouteComponentProps } from "@reach/router";

import ChapterLink from "./ChapterLink";
import PermissionDenied from "../PermissionDenied";
import CommitInfo from "./Commit";
import {
  BookQuery,
  ChapterFieldsFragment,
  useBookQuery,
} from "../graphql/types";

export type BookData = Omit<
  Extract<BookQuery["result"], { __typename: "Book" }>,
  "__typename"
>;
type Chapters = readonly ChapterFieldsFragment[];

type BookProps = RouteComponentProps &
  BookData & {
    gitRef: string;
  };

export const Book: React.FC<BookProps> = ({
  title,
  commit,
  latestCommit,
  permalink,
  gitRef,
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
              gitRef={gitRef}
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
      <Link to={`/books/${permalink}/invite`} className="inline-block">
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
        <Link to={`/books/${permalink}/notes`} className="inline-block">
          Notes for this book
        </Link>{" "}
        &middot;{" "}
        <Link to={`/books/${permalink}/branches`} className="inline-block">
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

const WrappedBook: React.FC<RouteComponentProps<WrappedBookProps>> = ({
  bookPermalink,
  gitRef,
}) => {
  const { data, loading, error } = useBookQuery({
    variables: { permalink: bookPermalink as string, gitRef: gitRef },
  });

  const renderBook = (data: BookQuery) => {
    if (data.result.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    const book = data.result;

    return <Book {...book} gitRef={gitRef as string} />;
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderBook(data)}
    </QueryWrapper>
  );
};

export default WrappedBook;
