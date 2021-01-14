import React from "react";
import { Books } from "../../Books";
import { BooksQuery } from "../../graphql/types";
import Layout from "../../layout";
import "../../styles.css";

const story = {
  title: "Books",
  component: Books,
};

export default story;

export const BooksIndex = () => {
  const books: BooksQuery["books"] = [
    {
      __typename: "Book",
      id: "1",
      title: "Markdown Book Test",
      permalink: "markdown-book-test",
      blurb: "For testing Markdown books",
    },
  ];
  return (
    <Layout>
      <Books books={books} />
    </Layout>
  );
};

BooksIndex.story = {
  name: "List",
};
