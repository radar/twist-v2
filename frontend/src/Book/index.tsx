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
  Extract<BookQuery["book"], { __typename?: "Book" }>,
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

  return (
    <div className={`bg-white p-4 border-gray-400 border rounded md:w-1/2`}>
      <h1>{title}</h1>
      <CommitInfo
        permalink={permalink}
        commit={commit}
        latestCommit={latestCommit}
      />
      <Link to={`/books/${permalink}/notes`} className="mb-4 inline-block">
        Notes for this book
      </Link>{" "}
      &middot;{" "}
      <Link to={`/books/${permalink}/branches`} className="mb-4 inline-block">
        Branches
      </Link>
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
    if (data.book.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    return <Book {...data.book} gitRef={gitRef as string} />;
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderBook(data)}
    </QueryWrapper>
  );
};

export default WrappedBook;
