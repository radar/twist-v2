import React from "react";
import { Books } from "../../Books";
import Layout from "../../layout";
import "../../styles.css";

export default {
  title: "Books",
  component: Books,
};

export const BooksIndex = () => {
  const books = [
    {
      id: 1,
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
