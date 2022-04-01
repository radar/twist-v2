import * as React from "react";
import Link from "next/link";
import bookLink from "./book/link";

type ChapterLinkProps = {
  bookPermalink: string;
  gitRef?: string;
  title: string;
  permalink: string;
};

const ChapterLink = ({
  bookPermalink,
  gitRef,
  title,
  permalink,
}: ChapterLinkProps) => {
  const link = `${bookLink(bookPermalink, gitRef)}/chapters/${permalink}`;

  return (
    <li>
      <Link href={link}>{title}</Link>
    </li>
  );
};

export default ChapterLink;
