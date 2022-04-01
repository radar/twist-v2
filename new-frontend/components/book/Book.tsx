import React from "react";
import Link from "next/link";
import CommitInfo from "components/Commit";
import ChapterLink from "components/ChapterLink";
import { BookQuery, ChapterFieldsFragment, useBookQuery } from "graphql/types";

type Chapters = readonly ChapterFieldsFragment[];

export type BookData = Extract<BookQuery["result"], { __typename?: "Book" }>;

type BookProps = BookData & {
  gitRef?: string;
};

const Book = ({
  gitRef,
  title,
  commit,
  latestCommit,
  permalink,
  currentUserAuthor,
}: BookProps) => {
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
      &middot; <Link href={`/books/${permalink}/invite`}>Invite a reader</Link>
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
        <Link href={`/books/${permalink}/notes`}>Notes for this book</Link>{" "}
        &middot; <Link href={`/books/${permalink}/branches`}>Branches</Link>{" "}
        {currentUserAuthor && inviteAReader}
      </div>
      <hr />
      {renderPart("Frontmatter", frontmatter)}
      {renderPart("Mainmatter", mainmatter)}
      {renderPart("Backmatter", backmatter)}
    </div>
  );
};

export default Book;
