import React, { Component } from "react";
import moment from "moment";

import QueryWrapper from "../QueryWrapper";
import { Link, RouteComponentProps } from "@reach/router";

import ChapterLink from "./ChapterLink";
import bookQuery from "./BookQuery";

type ChapterProps = {
  id: string;
  title: string;
  permalink: string;
};

interface BookProps extends RouteComponentProps {
  commitSHA: string;
  title: string;
  permalink: string;
  latestCommit: {
    sha: string;
  };
  commit: {
    branch: {
      name: string;
    };
    sha: string;
    createdAt: string;
    frontmatter: ChapterProps[];
    mainmatter: ChapterProps[];
    backmatter: ChapterProps[];
  };
}

export class Book extends Component<BookProps> {
  renderPart(title: string, chapters: ChapterProps[]) {
    if (chapters.length === 0) {
      return null;
    }

    const { permalink, commitSHA } = this.props;

    return (
      <div className="mt-3">
        <h3>{title}</h3>
        <ol className="{{title.toLowerCase()}} list-decimal list-inside">
          {chapters.map(chapter => (
            <ChapterLink
              {...chapter}
              commitSHA={commitSHA}
              bookPermalink={permalink}
              key={chapter.id}
            />
          ))}
        </ol>
      </div>
    );
  }

  renderCommitSHA() {
    const {
      permalink,
      commit: { sha, createdAt, branch },
      latestCommit
    } = this.props;
    let latest;
    if (sha != latestCommit.sha) {
      latest = <Link to={`/books/${permalink}`}> Go to latest revision </Link>;
    } else {
      latest = "Latest commit";
    }
    return (
      <div className="text-gray-600 mb-4">
        <small>
          {branch.name}@{sha.slice(0, 8)} &middot; {moment(createdAt).fromNow()}{" "}
          &middot; {latest}
        </small>
      </div>
    );
  }

  render() {
    const {
      title,
      permalink,
      commit: { frontmatter, mainmatter, backmatter }
    } = this.props;

    return (
      <div className={`bg-white p-4 border-gray-400 border rounded md:w-1/2`}>
        <h1>{title}</h1>
        {this.renderCommitSHA()}
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
  commitSHA: string;
}

interface WrappedBookProps
  extends RouteComponentProps<WrappedBookMatchParams> {}

export default class WrappedBook extends Component<WrappedBookProps> {
  render() {
    const { bookPermalink, commitSHA } = this.props;
    return (
      <QueryWrapper
        query={bookQuery}
        variables={{ permalink: bookPermalink, commitSHA: commitSHA }}
      >
        {data => {
          return <Book commitSHA={commitSHA} {...data.book} />;
        }}
      </QueryWrapper>
    );
  }
}
