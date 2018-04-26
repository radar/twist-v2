import React from 'react'
import { MemoryRouter } from 'react-router'

import { storiesOf } from '@storybook/react'
import { Book } from './index'

const bookData = {
  book: {
    title: 'Exploding Rails',
    permalink: 'exploding-rails',
    blurb: 'Explode your Rails app',
    defaultBranch: {
      frontmatter: [
        {
          id: '1',
          title: 'Introduction',
          permalink: 'introduction'
        }
      ],
      mainmatter: [
        {
          id: '2',
          title: 'Getting Started',
          permalink: 'getting-started'
        }
      ],
      backmatter: [
        {
          id: '3',
          title: 'Appendix',
          permalink: 'appendix'
        }
      ]
    }
  }
}

storiesOf('Book', module)
  .add('viewing chapters', () => (<MemoryRouter><Book data={bookData} /></MemoryRouter>))
