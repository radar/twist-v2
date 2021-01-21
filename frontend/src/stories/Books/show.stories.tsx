import React from "react";
import { Book, BookData } from "../../Book";
import Layout from "../../layout";
import "../../styles.css";

type Commit = BookData["commit"];
type LatestCommit = BookData["latestCommit"];

const story = {
  title: "Books",
  component: Book,
};

export default story;

export const BooksShow = () => {
  const commit: Commit = {
    __typename: "Commit",
    sha: "abc123",
    createdAt: "2020-04-15 10:10:10",
    branch: {
      __typename: "Branch",
      name: "master",
    },
    frontmatter: [
      {
        __typename: "Chapter",
        position: 1,
        id: "1",
        title: "Introduction",
        permalink: "introduction",
      },
    ],
    mainmatter: [],
    backmatter: [],
  };
  const latestCommit: LatestCommit = {
    __typename: "Commit",
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
        currentUserAuthor={false}
      />
    </Layout>
  );
};

BooksShow.story = {
  name: "Show",
};
