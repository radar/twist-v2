import React, { Component } from "react";
import { Link } from "@reach/router";

import styles from "./BookItem.module.scss";

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
      <div className={styles.bookItem}>
        <h2>
          <Link to={`/books/${permalink}`}>{title}</Link>
        </h2>
        <span className="blurb">{blurb}</span>
      </div>
    );
  }
}
