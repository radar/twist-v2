import React from 'react'

import { storiesOf } from '@storybook/react'
import { Element } from './element'

const pElementProps = {
  id: 1,
  noteCount: 0,
  tag: 'p',
  content: '<p>Thanks for reading Exploding Rails!</p>'
}

storiesOf('Element', module).add('paragraph', () => (
  <div className="container">
    <div className="row">
      <div className="main col-md-7" id="chapter">
        <Element {...pElementProps} />
      </div>
    </div>
  </div>
))

const imgElementProps = {
  id: 1,
  noteCount: 0,
  tag: 'img',
  image: { path: 'http://placekitten.com/200/300' }
}

storiesOf('Element', module).add('image', () => (
  <div className="container">
    <div className="row">
      <div className="main col-md-7" id="chapter">
        <Element {...imgElementProps} />
      </div>
    </div>
  </div>
))
