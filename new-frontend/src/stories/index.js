import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import StoryRouter from 'storybook-react-router';

import '../App.scss'

addDecorator(StoryRouter({
  '/': linkTo('Books', 'list'),
  '/books/:id': linkTo('Book', 'show'),
  '/books/:bookId/chapters/:chapterId': linkTo('Chapter', 'show'),
}));

import { Book } from '../Book'
import { Books } from '../Books'
import { Chapter } from '../Book/Chapter'

storiesOf('Books', module).add('list', () => {
  const books = [
    {
      id: 1,
      title: "Markdown Book Test",
      permalink: "markdown-book-test",
      blurb: "For testing Markdown books"
    }
  ]
  return (<Books books={books} />);
})

storiesOf('Book', module).add('show', () => {
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
  }
  return (<Book
    title="Markdown Book Test"
    permalink="markdown-book-test"
    defaultBranch={defaultBranch}
  />);
})

storiesOf('Chapter', module).add('show', () => {
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
    sections: [{
      id: "1",
      link: "#in-the-beginning",
      title: "In the beginning",
      subsections: [{
        id: "2",
        link: "#this-is-a-new-section",
        title: "This is a new section"
      }]
    }],
    nextChapter: null,
    previousChapter: null,
  }
  return (<Chapter {...chapter} />);
})
