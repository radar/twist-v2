import React, { Component } from "react";
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
  title: string;
  permalink: string;
  defaultBranch: {
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

    return (
      <div className="mt-3">
        <h3>{title}</h3>
        <ol className="{{title.toLowerCase()}} list-decimal list-inside">
          {chapters.map(chapter => (
            <ChapterLink
              {...chapter}
              bookPermalink={this.props.permalink}
              key={chapter.id}
            />
          ))}
        </ol>
      </div>
    );
  }

  render() {
    const {
      title,
      permalink,
      defaultBranch: { frontmatter, mainmatter, backmatter }
    } = this.props;

    return (
      <div className={`bg-white p-4 border-gray-400 border rounded md:w-1/2`}>
        <h1>{title}</h1>
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
}

interface WrappedBookProps
  extends RouteComponentProps<WrappedBookMatchParams> {}

export default class WrappedBook extends Component<WrappedBookProps> {
  render() {
    return (
      <QueryWrapper
        query={bookQuery}
        variables={{ permalink: this.props.bookPermalink }}
      >
        {data => {
          return <Book {...data.book} />;
        }}
      </QueryWrapper>
    );
  }
}
