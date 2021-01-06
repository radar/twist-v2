import React from "react";
import { Link, RouteComponentProps } from "@reach/router";

import QueryWrapper from "../../QueryWrapper";
import Element from "./Element";
import Footnote from "./Footnote";
import { PreviousChapterLink, NextChapterLink } from "./Link";
import SectionList from "./SectionList";
import bookLink from "../../Book/link";

import PermissionDenied from "../../PermissionDenied";
import Commit from "../Commit";
import { ChapterQuery, Section, useChapterQuery } from "../../graphql/types";

type ChapterQueryBook = Extract<ChapterQuery["book"], { __typename: "Book" }>;

type LatestCommit = ChapterQueryBook["latestCommit"];

export type ChapterAtCommitProps = RouteComponentProps &
  ChapterQueryBook["commit"] & {
    bookTitle: string;
    bookPermalink: string;
    gitRef: string;
    latestCommit: LatestCommit;
  };

export const chapterPositionAndTitle = (
  part: string,
  position: number,
  title: string
) => {
  if (part === "mainmatter") {
    return `${position}. ${title}`;
  } else {
    return title;
  }
};

const ChapterAtCommit: React.FC<ChapterAtCommitProps> = ({
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
        <div className="grid grid-cols-2">
          <div>{renderPreviousChapterLink()}</div>
          <div className="text-right">{renderNextChapterLink()}</div>
        </div>
      </div>
    );
  };

  const {
    part,
    position,
    title: chapterTitle,
    elements,
    footnotes,
    sections,
  } = chapter;

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
    <div className="flex flex-wrap lg:flex-no-wrap">
      <div className="w-1/12"></div>
      <div className="main w-full lg:w-3/4 flex-grow mr-4 chapter">
        <header className="mb-4">
          <h1>
            <Link id="top" to={bookPath}>
              {bookTitle}
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

      <div className="w-full lg:w-1/4">
        <div id="sidebar">
          {renderPreviousChapterLink()}
          <hr className="my-2" />

          <h4 className="text-xl font-bold">
            <a href="#top">{positionAndTitle}</a>
          </h4>

          <SectionList sections={sections as Array<Section>} />

          <hr className="my-2" />
          {renderNextChapterLink()}
        </div>
      </div>
    </div>
  );
};

interface WrappedChapterMatchParams {
  bookPermalink: string;
  chapterPermalink: string;
  gitRef: string;
}

const WrappedChapter: React.FC<
  RouteComponentProps<WrappedChapterMatchParams>
> = ({ bookPermalink, chapterPermalink, gitRef }) => {
  const { data, loading, error } = useChapterQuery({
    variables: {
      bookPermalink: bookPermalink as string,
      chapterPermalink: chapterPermalink as string,
      gitRef: gitRef,
    },
  });

  const renderChapter = (data: ChapterQuery) => {
    const { book } = data;

    if (book.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    return (
      <ChapterAtCommit
        {...book.commit}
        bookTitle={book.title}
        bookPermalink={bookPermalink as string}
        gitRef={gitRef as string}
        latestCommit={book.latestCommit}
      />
    );
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderChapter(data)}
    </QueryWrapper>
  );
};
export { ChapterAtCommit };
export default WrappedChapter;
