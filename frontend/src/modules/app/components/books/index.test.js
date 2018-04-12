// Link.react.test.js
import React from 'react';
import Books from './index.js';
import { shallow } from 'enzyme';
import { ApolloProvider } from 'react-apollo'

const client = {}

test('Books', () => {
  const data = {
    loading: false,
    books: [
      {
        id: 1,
        title: "Exploding Rails",
        permalink: "exploding-rails",
        blurb: "Explode your Rails application"
      }
    ]
  }
  const component = shallow(
    <Books data={data} />
  );
  expect(component.render()).toMatchSnapshot();
});
