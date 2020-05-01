import React, { Component } from "react";
import { Link } from "@reach/router";
import { NavigationalChapter, chapterPositionAndTitle } from "./index";
import bookLink from "../../Book/link";

type ChapterLinkProps = NavigationalChapter & {
  direction: "back" | "forward";
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

    if (direction == "back") {
      return (
        <Link to={path} className="font-bold">
          « {text}
        </Link>
      );
    } else {
      return (
        <Link to={path} className="font-bold">
          {text} »
        </Link>
      );
    }
  }
}

export class PreviousChapterLink extends Component<NavigationalChapter> {
  render() {
    return <ChapterLink {...this.props} direction="back" />;
  }
}

export class NextChapterLink extends Component<NavigationalChapter> {
  render() {
    return <ChapterLink {...this.props} direction="forward" />;
  }
}
