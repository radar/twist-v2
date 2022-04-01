import React from "react";
import Link from "next/link";

import Element from "components/elements/element";
import Footnote from "components/elements/Footnote";
import {
  PreviousChapterLink,
  NextChapterLink,
  chapterPositionAndTitle,
} from "components/chapter/Link";
import bookLink from "components/book/link";

import Commit from "components/Commit";
import { ChapterQuery } from "graphql/types";

type ChapterQueryBook = Extract<ChapterQuery["book"], { __typename?: "Book" }>;

type LatestCommit = ChapterQueryBook["latestCommit"];

export type ChapterAtCommitProps = ChapterQueryBook["commit"] & {
  bookTitle: string;
  bookPermalink: string;
  latestCommit: LatestCommit;
  gitRef?: string;
};

const Chapter: React.FC<ChapterAtCommitProps> = ({
  // Params
  bookPermalink,
  bookTitle,
  gitRef,
  // Commit props
  sha,
  createdAt,
  branch,
  // Latest commit props
  latestCommit,
  // Chapter props
  chapter,
}) => {
  const { previousChapter, nextChapter } = chapter;

  const renderPreviousChapterLink = () => {
    if (previousChapter) {
      return (
        <PreviousChapterLink
          {...previousChapter}
          bookPermalink={bookPermalink}
          gitRef={gitRef}
        />
      );
    }
  };

  const renderNextChapterLink = () => {
    if (nextChapter) {
      return (
        <NextChapterLink
          {...nextChapter}
          gitRef={gitRef}
          bookPermalink={bookPermalink}
        />
      );
    }
  };

  const renderChapterLinks = () => {
    return (
      <div>
        <div className="flex">
          <div>{renderPreviousChapterLink()}</div>
          <div className="ml-auto">{renderNextChapterLink()}</div>
        </div>
      </div>
    );
  };

  const { part, position, title: chapterTitle, elements, footnotes } = chapter;

  const renderFootnotes = () => {
    return (
      <div>
        <h3>Footnotes</h3>
        {footnotes.map((footnote) => (
          <Footnote {...footnote} key={footnote.identifier} />
        ))}
      </div>
    );
  };

  const positionAndTitle = chapterPositionAndTitle(
    part,
    position,
    chapterTitle
  );

  const bookPath = bookLink(bookPermalink, gitRef);

  const commit = { sha, createdAt, branch };

  return (
    <div className="flex flex-wrap lg:flex-no-wrap mx-16 md:mx-0">
      <div className="w-1/12"></div>
      <div className="w-full lg:w-3/4 flex-grow mr-4 chapter">
        <header className="mb-4">
          <h1>
            <Link href={bookPath}>
              <a id="top">{bookTitle}</a>
            </Link>
          </h1>

          <Commit
            permalink={bookPermalink}
            commit={commit}
            latestCommit={latestCommit}
          />
        </header>
        {renderChapterLinks()}
        <h2 className="mt-3">{positionAndTitle}</h2>
        {elements &&
          elements.map((element) => (
            <Element
              {...element}
              bookPermalink={bookPermalink}
              key={element.id}
            />
          ))}

        {renderFootnotes()}
        {renderChapterLinks()}
      </div>
    </div>
  );
};

export default Chapter;
