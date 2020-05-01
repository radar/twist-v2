import * as React from "react";
import { Link } from "@reach/router";
import bookLink from "../Book/link";

type ChapterLinkProps = {
  bookPermalink: string;
  gitRef: string;
  title: string;
  permalink: string;
};

export default class ChapterLink extends React.Component<ChapterLinkProps> {
  render() {
    const { bookPermalink, gitRef, title, permalink } = this.props;

    const link = `${bookLink(bookPermalink, gitRef)}/chapters/${permalink}`;

    return (
      <li>
        <Link to={link}>{title}</Link>
      </li>
    );
  }
}
