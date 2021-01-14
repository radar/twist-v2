import React, { Component } from "react";
import { Link } from "@reach/router";
import { chapterPositionAndTitle } from "./index";
import bookLink from "../../Book/link";
import { Chapter } from "../../graphql/types";

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
        <Link to={path} className="font-bold">
          « {text}
        </Link>
      );
    }

    return (
      <Link to={path} className="font-bold">
        {text} »
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
