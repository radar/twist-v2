import React, { Component } from "react";
import { Link, RouteComponentProps } from "@reach/router";

import QueryWrapper from "../../QueryWrapper";
import chapterQuery from "./ChapterQuery";
import Element, { ElementProps } from "./Element";
import { PreviousChapterLink, NextChapterLink } from "./Link";
import SectionList from "./SectionList";

import * as styles from "./Chapter.module.scss";

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
  title: string;
  position: number;
  part: string;
  elements: Array<ElementProps>;
  sections: Array<SectionProps>;
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
      <div className="row">
        <div className="col-12">
          <div className="float-left">{this.renderPreviousChapterLink()}</div>
          <div className="float-right">{this.renderNextChapterLink()}</div>
        </div>
      </div>
    );
  }

  render() {
    const {
      bookId,
      bookTitle,
      bookPermalink,
      part,
      title: chapterTitle,
      position,
      elements,
      sections
    } = this.props;

    const positionAndTitle = chapterPositionAndTitle(
      part,
      position,
      chapterTitle
    );

    return (
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-1">&nbsp;</div>
          <div className={`main col-md-7 col-lg-7 col-xl-9 ${styles.chapter}`}>
            <h1>
              <Link id="top" to={`/books/${bookPermalink}`}>
                {bookTitle}
              </Link>
            </h1>
            {this.renderChapterLinks()}
            <h2>{positionAndTitle}</h2>
            {elements.map(element => (
              <Element {...element} bookId={bookId} key={element.id} />
            ))}
            {this.renderChapterLinks()}
          </div>

          <div className="col-md-4 col-lg-4 col-xl-2">
            <div id="sidebar">
              {this.renderPreviousChapterLink()}
              <hr />

              <h4>
                <a href="#top">{positionAndTitle}</a>
              </h4>

              <SectionList sections={sections} />

              <hr />
              {this.renderNextChapterLink()}
            </div>
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
          return (
            <Chapter
              bookId={data.book.id}
              bookTitle={data.book.title}
              bookPermalink={bookPermalink}
              {...data.book.defaultBranch.chapter}
            />
          );
        }}
      </QueryWrapper>
    );
  }
}

export default WrappedChapter;
