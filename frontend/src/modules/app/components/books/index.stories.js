import React from 'react'
import { MemoryRouter } from 'react-router'

import { storiesOf } from '@storybook/react'
import { Books } from './index'

const booksData = {
  books: [
    {
      title: 'Exploding Rails',
      permalink: 'exploding-rails',
      blurb: 'Explode your Rails app'
    }
  ]
}

storiesOf('Books', module)
  .add('with a book', () => (<MemoryRouter><Books data={booksData} /></MemoryRouter>))
