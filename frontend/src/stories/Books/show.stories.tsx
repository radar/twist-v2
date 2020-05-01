import React from "react";
import { Book, Commit } from "../../Book";
import Layout from "../../layout";
import "../../styles.css";

export default {
  title: "Books",
  component: Book,
};

export const BooksShow = () => {
  const commit: Commit = {
    sha: "abc123",
    createdAt: "2020-04-15 10:10:10",
    branch: {
      name: "master",
    },
    frontmatter: [
      {
        id: "1",
        title: "Introduction",
        permalink: "introduction",
      },
    ],
    mainmatter: [],
    backmatter: [],
  };
  const latestCommit = {
    sha: "def123",
  };
  return (
    <Layout>
      <Book
        gitRef={"abc123"}
        latestCommit={latestCommit}
        commit={commit}
        title="Markdown Book Test"
        permalink="markdown-book-test"
      />
    </Layout>
  );
};

BooksShow.story = {
  name: "Show",
};
