import React, { Component } from "react";
import moment from "moment";

import QueryWrapper from "../QueryWrapper";
import { Link, RouteComponentProps } from "@reach/router";

import ChapterLink from "./ChapterLink";
import bookQuery from "./BookQuery";
import PermissionDenied from "../PermissionDenied";
import CommitInfo from "./Commit";

type ChapterProps = {
  id: string;
  title: string;
  permalink: string;
};

export type Commit = {
  branch: {
    name: string;
  };
  sha: string;
  createdAt: string;
  frontmatter: ChapterProps[];
  mainmatter: ChapterProps[];
  backmatter: ChapterProps[];
};

interface BookProps extends RouteComponentProps {
  gitRef: string;
  title: string;
  permalink: string;
  latestCommit: {
    sha: string;
  };
  commit: Commit;
  error?: string;
}

interface PermissionDenied {
  error: string;
}

export class Book extends Component<BookProps> {
  renderPart(title: string, chapters: ChapterProps[]) {
    if (chapters.length === 0) {
      return null;
    }

    const { permalink, gitRef } = this.props;

    return (
      <div className="mt-3">
        <h3>{title}</h3>
        <ol className="{{title.toLowerCase()}} list-decimal list-inside">
          {chapters.map((chapter) => (
            <ChapterLink
              {...chapter}
              gitRef={gitRef}
              bookPermalink={permalink}
              key={chapter.id}
            />
          ))}
        </ol>
      </div>
    );
  }

  render() {
    const { error } = this.props;

    if (error) {
      return <PermissionDenied />;
    }

    const {
      title,
      permalink,
      commit: { frontmatter, mainmatter, backmatter },
      latestCommit,
    } = this.props;

    return (
      <div className={`bg-white p-4 border-gray-400 border rounded md:w-1/2`}>
        <h1>{title}</h1>

        <CommitInfo
          permalink={permalink}
          commit={this.props.commit}
          latestCommit={latestCommit}
        />
        <Link to={`/books/${permalink}/notes`} className="mb-4 inline-block">
          Notes for this book
        </Link>
        <hr />
        {this.renderPart("Frontmatter", frontmatter)}
        {this.renderPart("Mainmatter", mainmatter)}
        {this.renderPart("Backmatter", backmatter)}
      </div>
    );
  }
}

interface WrappedBookMatchParams {
  bookPermalink: string;
  gitRef: string;
}

interface WrappedBookProps
  extends RouteComponentProps<WrappedBookMatchParams> {}

export default class WrappedBook extends Component<WrappedBookProps> {
  render() {
    const { bookPermalink, gitRef } = this.props;

    return (
      <QueryWrapper
        query={bookQuery}
        variables={{ permalink: bookPermalink, gitRef: gitRef }}
      >
        {(data: { book: BookProps }) => {
          return <Book gitRef={gitRef} {...data.book} />;
        }}
      </QueryWrapper>
    );
  }
}
