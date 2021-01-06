import * as React from "react";
import { Link } from "@reach/router";
import bookLink from "../Book/link";

type ChapterLinkProps = {
  bookPermalink: string;
  gitRef: string;
  title: string;
  permalink: string;
};

const ChapterLink: React.FC<ChapterLinkProps> = ({
  bookPermalink,
  gitRef,
  title,
  permalink,
}) => {
  const link = `${bookLink(bookPermalink, gitRef)}/chapters/${permalink}`;

  return (
    <li>
      <Link to={link}>{title}</Link>
    </li>
  );
};

export default ChapterLink;
