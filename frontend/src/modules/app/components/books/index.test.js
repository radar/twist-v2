import React from 'react';
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'
import { Books } from './index.js'

const RouterContext = React.createContext('router');

test('Books', () => {
  const data = {
    books: [
      {
        id: 1,
        title: "Exploding Rails",
        permalink: "exploding-rails",
        blurb: "Explode your Rails applications"
      }
    ]
  }
  const component = renderer.create(
    <MemoryRouter>
      <Books data={data} />
    </MemoryRouter>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
