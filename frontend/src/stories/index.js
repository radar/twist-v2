import React from "react";

import { storiesOf, addDecorator } from "@storybook/react";
// import { action } from '@storybook/addon-actions';
import { linkTo } from "@storybook/addon-links";

import "../App.scss";

addDecorator(
  StoryRouter({
    "/": linkTo("Books", "list"),
    "/books/:id": linkTo("Book", "show"),
    "/books/:bookId/chapters/:chapterId": linkTo("Chapter", "show")
  })
);

import { Book } from "../Book";
import { Books } from "../Books";
import { Chapter } from "../Book/Chapter";
import { Form as NoteForm } from "../Book/Chapter/Notes/Form";
import { NoteList } from "../Book/Notes/List";

import { ElementWithNotesProps } from "../Book/Notes/types";

storiesOf("Books", module).add("list", () => {
  const books = [
    {
      id: 1,
      title: "Markdown Book Test",
      permalink: "markdown-book-test",
      blurb: "For testing Markdown books"
    }
  ];
  return <Books books={books} />;
});

storiesOf("Book", module).add("show", () => {
  const defaultBranch = {
    frontmatter: [
      {
        id: "1",
        title: "Introduction",
        permalink: "introduction"
      }
    ],
    mainmatter: [],
    backmatter: []
  };
  return (
    <Book
      title="Markdown Book Test"
      permalink="markdown-book-test"
      defaultBranch={defaultBranch}
    />
  );
});

storiesOf("Book/Notes", module).add("list", () => {
  const elementsWithNotes = [
    {
      id: "1",
      content: "This is some content that has a note attached to it.",
      tag: "p",
      bookPermalink: "markdown-book-test",
      notes: [
        {
          id: "1",
          text: "First _things_ **first**!",
          user: {
            id: "1",
            email: "me@ryanbigg.com",
            name: "Ryan Bigg"
          }
        }
      ],
      chapter: {
        title: "Introduction",
        position: "1",
        part: "mainmatter",
        commit: {
          sha: "abc1234",
          branch: {
            name: "master"
          }
        }
      }
    },
    {
      id: "2",
      content: "This is a second element which also has content",
      tag: "p",
      bookPermalink: "markdown-book-test",
      notes: [
        {
          id: "1",
          text: "Second _things_ **second**!",
          user: {
            id: "1",
            email: "me@ryanbigg.com",
            name: "Ryan Bigg"
          }
        }
      ],
      chapter: {
        title: "Introduction",
        position: "1",
        part: "mainmatter",
        commit: {
          sha: "abc1234",
          branch: {
            name: "master"
          }
        }
      }
    }
  ];
  return (
    <div className="main">
      <h1>Markdown Book Test - Notes</h1>
      <NoteList
        elementsWithNotes={elementsWithNotes}
        bookPermalink="markdown-book-test"
      />
    </div>
  );
});

storiesOf("Book/Chapter", module)
  .add("show", () => {
    const chapter = {
      bookTitle: "Markdown Book Test",
      bookPermalink: "markdown-book-test",
      id: "1",
      title: "Introduction",
      permalink: "introduction",
      part: "frontmatter",
      position: 1,
      elements: [
        {
          id: "1",
          content: "<h1>In the beginning</h1>",
          tag: "h1",
          noteCount: 1
        },
        {
          id: "2",
          content: "<p>This is a test of the markdown processing system</p>",
          tag: "p",
          noteCount: 0
        },
        {
          id: "3",
          content: "<h2>This is a new section</h2>",
          tag: "h2",
          noteCount: 1
        },
        {
          id: "4",
          content: "<p>And here's some text for that section.</p>",
          tag: "p",
          noteCount: 0
        }
      ],
      sections: [
        {
          id: "1",
          link: "#in-the-beginning",
          title: "In the beginning",
          subsections: [
            {
              id: "2",
              link: "#this-is-a-new-section",
              title: "This is a new section"
            }
          ]
        }
      ],
      nextChapter: null,
      previousChapter: null
    };
    return <Chapter {...chapter} />;
  })
  .add("note form", () => {
    const formProps = {
      elementId: "1",
      submitNote: () => {},
      noteSubmitted: () => {}
    };
    return (
      <div className="main">
        <NoteForm {...formProps} />
      </div>
    );
  });
