import React from 'react';
import { MemoryRouter } from 'react-router'

import { storiesOf } from '@storybook/react'
import { BookNote } from './index'

const noteData = {
  book: {
    id: "1",
    permalink: "exploding-rails",
    title: "Exploding Rails",
    note: {
      id: 1,
      createdAt: "2018-04-23T11:15:20+10:00",
      element: {
        id: "1",
        noteCount: 0,
        tag: "p",
        content: "<p>Thanks for reading!</p>",
        image: null,
      },
      user: {
        email: "me@ryanbigg.com",
        name: "Ryan Bigg"
      }
    }
  }
}

storiesOf('Note', module)
  .add('show', () => (
    <MemoryRouter>
      <BookNote data={noteData} />
    </MemoryRouter>
   ))
