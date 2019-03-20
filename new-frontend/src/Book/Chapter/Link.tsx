import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavigationalChapter, chapterPositionAndTitle } from "./index"

type ChapterLinkProps = NavigationalChapter & {
  icon: string,
}

class ChapterLink extends Component<ChapterLinkProps> {
  render() {
    const { icon, part, position, title, permalink, bookPermalink } = this.props

    const text = chapterPositionAndTitle(part, position, title)

    return <Link to={`/books/${bookPermalink}/chapters/${permalink}`}>{icon} {text}</Link>
  }
}

export class PreviousChapterLink extends Component<NavigationalChapter> {
  render() {
    return <ChapterLink {...this.props} icon={"&laquo;"} />
  }
}

export class NextChapterLink extends Component<NavigationalChapter> {
  render() {
    return <ChapterLink {...this.props} icon={"&raquo;"} />
  }
}
