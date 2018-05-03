import React from 'react'
import { MemoryRouter } from 'react-router'

import { storiesOf } from '@storybook/react'
import { BookNote } from './index'

const noteData = {
  book: {
    id: '1',
    permalink: 'exploding-rails',
    title: 'Exploding Rails',
    note: {
      id: 1,
      createdAt: '2018-04-23T11:15:20+10:00',
      text: 'Lorem ipsum dolor sit amet',
      element: {
        id: '1',
        noteCount: 0,
        tag: 'p',
        content: '<p>Thanks for reading!</p>',
        image: null,
        chapter: {
          id: '1',
          title: 'Introduction',
          part: 'frontmatter',
          commit: {
            sha: 'abc123',
            createdAt: '2018-04-22:15:20+10:00',
            branch: {
              name: 'master'
            }
          }
        }
      },
      user: {
        email: 'me@ryanbigg.com',
        name: 'Ryan Bigg'
      }
    }
  }
}

storiesOf('Note', module).add('show', () => (
  <MemoryRouter>
    <BookNote data={noteData} />
  </MemoryRouter>
))
