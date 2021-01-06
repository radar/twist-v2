import * as React from "react";

import { BareElement } from "../Chapter/Element";
import * as styles from "./ElementWithInfo.module.scss";
import { Link } from "@reach/router";
import { Commit, ElementWithInfoFragment } from "../../graphql/types";

type ElementWithInfoProps = Omit<ElementWithInfoFragment, "notes"> & {
  bookPermalink: string;
  className?: string;
};

type CommitInfo = ElementWithInfoFragment["chapter"]["commit"];

export default class ElementWithInfo extends React.Component<ElementWithInfoProps> {
  renderChapterTitle(chapter: ElementWithInfoProps["chapter"]) {
    const { part, position, title } = chapter;

    if (part === "mainmatter") {
      return `${position}. ${title}`;
    } else {
      return title;
    }
  }

  renderCommitInfo(commit: CommitInfo) {
    const {
      sha,
      branch: { name },
    } = commit;

    return (
      <span>
        &nbsp;on {name} @ {sha.slice(0, 8)}
      </span>
    );
  }

  renderPermalink() {
    const {
      id,
      bookPermalink,
      chapter: {
        permalink,
        commit: { sha },
      },
    } = this.props;

    const shortSha = sha.slice(0, 8);

    return (
      <Link
        to={`/books/${bookPermalink}/tree/${shortSha}/chapters/${permalink}#${id}`}
      >
        Permalink
      </Link>
    );
  }

  render() {
    const { chapter, className } = this.props;

    return (
      <div className={className}>
        <BareElement {...this.props} />
        <span className="text-sm italic">
          From {this.renderChapterTitle(chapter)}
          {this.renderCommitInfo(chapter.commit)} - {this.renderPermalink()}
        </span>
      </div>
    );
  }
}
