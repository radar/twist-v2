import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bookWithData } from './container'
import errorWrapper from 'error_wrapper'
import loadingWrapper from 'loading_wrapper'

class ChapterLink extends Component {
  render() {
    const { bookPermalink, title, permalink } = this.props

    return (
      <li>
        <Link to={`/books/${bookPermalink}/chapters/${permalink}`}>{title}</Link>
      </li>
    )
  }
}

ChapterLink.propTypes = {
  bookPermalink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired
}

class Book extends React.Component {
  renderPart(title, chapters) {
    const permalink = this.props.data.book.permalink

    return (
      <div>
        <h3>{title}</h3>
        <ol className="{{title.toLowerCase()}}">
          {chapters.map(chapter => (
            <ChapterLink {...chapter} bookPermalink={permalink} key={chapter.id} />
          ))}
        </ol>
      </div>
    )
  }

  render() {
    const { data: { book } } = this.props

    const { title, defaultBranch: { frontmatter, mainmatter, backmatter } } = book

    return (
      <div className="row">
        <div className="col-md-7 main">
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
}

const chapterPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired
  })
)

Book.propTypes = {
  data: PropTypes.shape({
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      permalink: PropTypes.string.isRequired,
      defaultBranch: PropTypes.shape({
        frontmatter: chapterPropTypes,
        mainmatter: chapterPropTypes,
        backmatter: chapterPropTypes
      })
    })
  })
}

export default compose(bookWithData)(errorWrapper(loadingWrapper(Book)))
