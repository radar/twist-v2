import React, { Component } from "react";
import { Link } from "@reach/router";

export interface Book {
  id: number;
  title: string;
  permalink: string;
  blurb: string;
}

export default class BookItem extends Component<Book> {
  render() {
    const { permalink, title, blurb } = this.props;
    return (
      <div className="mb-4">
        <h2>
          <Link to={`/books/${permalink}`}>{title}</Link>
        </h2>
        <span className="text-gray-800">{blurb}</span>
      </div>
    );
  }
}
