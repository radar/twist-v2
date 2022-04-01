import React, { Component } from "react";
import Link from "next/link";
import bookLink from "components/book/link";
import { Chapter } from "graphql/types";

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

type ChapterLinkProps = Pick<
  Chapter,
  "id" | "part" | "position" | "title" | "permalink"
> & {
  direction: "back" | "forward";
  bookPermalink: string;
  gitRef: string;
};

class ChapterLink extends Component<ChapterLinkProps> {
  render() {
    const {
      id,
      direction,
      part,
      position,
      title,
      permalink,
      bookPermalink,
      gitRef,
    } = this.props;
    if (id === undefined) {
      return null;
    }

    const text = chapterPositionAndTitle(part, position, title);
    const path = `${bookLink(bookPermalink, gitRef)}/chapters/${permalink}`;

    if (direction === "back") {
      return (
        <Link href={path}>
          <a className="font-bold">« {text}</a>
        </Link>
      );
    }

    return (
      <Link href={path}>
        <a className="font-bold">{text} »</a>
      </Link>
    );
  }
}

export class PreviousChapterLink extends Component<
  Omit<ChapterLinkProps, "direction">
> {
  render() {
    return <ChapterLink {...this.props} direction="back" />;
  }
}

export class NextChapterLink extends Component<
  Omit<ChapterLinkProps, "direction">
> {
  render() {
    return <ChapterLink {...this.props} direction="forward" />;
  }
}
