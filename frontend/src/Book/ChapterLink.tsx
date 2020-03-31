import * as React from "react";
import { Link } from "@reach/router";
import bookLink from "../Book/link";

type ChapterLinkProps = {
  bookPermalink: string;
  commitSHA: string;
  title: string;
  permalink: string;
};

export default class ChapterLink extends React.Component<ChapterLinkProps> {
  render() {
    const { bookPermalink, commitSHA, title, permalink } = this.props;

    const link = `${bookLink(bookPermalink, commitSHA)}/chapters/${permalink}`;

    return (
      <li>
        <Link to={link}>{title}</Link>
      </li>
    );
  }
}
