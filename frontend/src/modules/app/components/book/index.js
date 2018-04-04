import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { Link } from 'react-router-dom'

import {bookWithData } from './container'
import errorWrapper from 'error_wrapper'
import loadingWrapper from 'loading_wrapper'

class ChapterLink extends Component {
  render () {
    const {bookPermalink, title, permalink} = this.props

    return (
      <li><Link to={`/books/${bookPermalink}/chapters/${permalink}`}>{title}</Link></li>
    )
  }
}

class Book extends React.Component {
  renderPart (title, chapters) {
    const permalink = this.props.data.book.permalink

    return (
      <div>
        <h3>{title}</h3>
        <ol className='{{title.toLowerCase()}}'>
          {chapters.map(chapter => (
            <ChapterLink {...chapter} bookPermalink={permalink} key={chapter.id} />
          ))}
        </ol>
      </div>
    )
  }

  render () {
    const {data: {book}} = this.props

    const {title, defaultBranch: {frontmatter, mainmatter, backmatter}} = book

    return (
      <div className='row'>
        <div className='col-md-7 main'>

          <h1>{title}</h1>
          LINK TO NOTES GOES HERE
          <hr />

          {this.renderPart('Frontmatter', frontmatter)}
          {this.renderPart('Mainmatter', mainmatter)}
          {this.renderPart('Backmatter', backmatter)}
        </div>
      </div>
    )
  }
};

export default compose(bookWithData)(errorWrapper(loadingWrapper(Book)))
