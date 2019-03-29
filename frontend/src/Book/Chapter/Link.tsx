import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavigationalChapter, chapterPositionAndTitle } from "./index"

type ChapterLinkProps = NavigationalChapter & {
  direction: "back" | "forward",
}

class ChapterLink extends Component<ChapterLinkProps> {
  render() {
    const { id, direction, part, position, title, permalink, bookPermalink } = this.props
    if (id === undefined) { return null }

    const text = chapterPositionAndTitle(part, position, title)
    const path = `/books/${bookPermalink}/chapters/${permalink}`

    if (direction == "back") {
      return <Link to={path}>« {text}</Link>
    } else {
      return <Link to={path}>{text} »</Link>
    }
  }
}

export class PreviousChapterLink extends Component<NavigationalChapter> {
  render() {
    return <ChapterLink {...this.props} direction="back" />
  }
}

export class NextChapterLink extends Component<NavigationalChapter> {
  render() {
    return <ChapterLink {...this.props} direction="forward" />
  }
}
