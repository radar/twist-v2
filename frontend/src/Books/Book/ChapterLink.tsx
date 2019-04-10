import * as React from "react";
import { Link } from "react-router-dom"

type ChapterLinkProps = {
  bookPermalink: string,
  title: string,
  permalink: string
}

export default class ChapterLink extends React.Component<ChapterLinkProps> {
  render() {
    const { bookPermalink, title, permalink } = this.props

    return (
      <li>
        <Link to={`/books/${bookPermalink}/chapters/${permalink}`}>{title}</Link>
      </li>
    )
  }
}
