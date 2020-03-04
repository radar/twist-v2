import React, { Component } from "react";
import { Link, RouteComponentProps } from "@reach/router";

import QueryWrapper from "../../QueryWrapper";
import chapterQuery from "./ChapterQuery";
import Element, { ElementProps } from "./Element";
import Footnote, { FootnoteProps } from "./Footnote";
import { PreviousChapterLink, NextChapterLink } from "./Link";
import SectionList from "./SectionList";

import styles from "./Chapter.module.scss";

type SubsectionProps = {
  id: string;
  title: string;
  link: string;
};

type SectionProps = {
  id: string;
  title: string;
  link: string;
  subsections: Array<SubsectionProps>;
};

export type NavigationalChapter = {
  id: string;
  permalink: string;
  part: string;
  title: string;
  position: number;
  bookPermalink: string;
};

interface ChapterProps extends RouteComponentProps {
  bookId: string;
  bookTitle: string;
  bookPermalink: string;
  branchName: string;
  title: string;
  position: number;
  part: string;
  elements: Array<ElementProps>;
  footnotes: Array<FootnoteProps>;
  sections: Array<SectionProps>;
  commit: {
    sha: string;
  };
  previousChapter: NavigationalChapter | null;
  nextChapter: NavigationalChapter | null;
}

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

export class Chapter extends Component<ChapterProps> {
  renderPreviousChapterLink() {
    const { bookPermalink, previousChapter } = this.props;
    if (previousChapter) {
      return (
        <PreviousChapterLink
          {...previousChapter}
          bookPermalink={bookPermalink}
        />
      );
    }
  }

  renderNextChapterLink() {
    const { bookPermalink, nextChapter } = this.props;
    if (nextChapter) {
      return <NextChapterLink {...nextChapter} bookPermalink={bookPermalink} />;
    }
  }

  renderChapterLinks() {
    return (
      <div>
        <div className="grid grid-cols-2">
          <div className="">{this.renderPreviousChapterLink()}</div>
          <div className="text-right">{this.renderNextChapterLink()}</div>
        </div>
      </div>
    );
  }

  renderFootnotes() {
    const { footnotes } = this.props;
    return (
      <div className={styles.footnotes}>
        <h3>Footnotes</h3>
        {footnotes.map(footnote => (
          <Footnote {...footnote} key={footnote.identifier} />
        ))}
      </div>
    );
  }

  render() {
    const {
      bookId,
      bookTitle,
      bookPermalink,
      branchName,
      part,
      title: chapterTitle,
      position,
      elements,
      sections,
      commit
    } = this.props;

    const positionAndTitle = chapterPositionAndTitle(
      part,
      position,
      chapterTitle
    );

    return (
      <div className="flex flex-wrap lg:flex-no-wrap">
        <div className="w-1/12"></div>
        <div className="main w-full lg:w-3/4 flex-grow mr-4 chapter">
          <header className="mb-4">
            <h1>
              <Link id="top" to={`/books/${bookPermalink}`}>
                {bookTitle}
              </Link>
            </h1>
            <small>
              <em className="text-gray-500">
                {branchName}@{commit.sha.slice(0, 8)}
              </em>
            </small>
          </header>
          {this.renderChapterLinks()}
          <h2 className="mt-3">{positionAndTitle}</h2>
          {elements.map(element => (
            <Element {...element} bookId={bookId} key={element.id} />
          ))}

          {this.renderFootnotes()}
          {this.renderChapterLinks()}
        </div>

        <div className="w-full lg:w-1/4">
          <div id="sidebar">
            {this.renderPreviousChapterLink()}
            <hr className="my-2" />

            <h4 className="text-xl font-bold">
              <a href="#top">{positionAndTitle}</a>
            </h4>

            <SectionList sections={sections} />

            <hr className="my-2" />
            {this.renderNextChapterLink()}
          </div>
        </div>
      </div>
    );
  }
}

interface WrappedChapterMatchParams {
  bookPermalink: string;
  chapterPermalink: string;
}

interface WrappedChapterProps
  extends RouteComponentProps<WrappedChapterMatchParams> {}

class WrappedChapter extends React.Component<WrappedChapterProps> {
  render() {
    const { bookPermalink, chapterPermalink } = this.props;
    return (
      <QueryWrapper
        query={chapterQuery}
        variables={{ bookPermalink, chapterPermalink }}
      >
        {data => {
          const { book } = data;
          return (
            <Chapter
              bookId={book.id}
              bookTitle={book.title}
              bookPermalink={bookPermalink}
              branchName={book.defaultBranch.name}
              {...data.book.defaultBranch.chapter}
            />
          );
        }}
      </QueryWrapper>
    );
  }
}

export default WrappedChapter;
