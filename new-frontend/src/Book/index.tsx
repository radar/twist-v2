import React, { Component } from 'react'
import QueryWrapper from '../QueryWrapper'
import { Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import ChapterLink from './ChapterLink'
import bookQuery from './BookQuery'

type ChapterProps = {
  id: string,
  title: string,
  permalink: string
}

type BookProps = {
  title: string,
  permalink: string,
  defaultBranch: {
    frontmatter: ChapterProps[],
    mainmatter: ChapterProps[],
    backmatter: ChapterProps[]
  }
}

export class Book extends Component<BookProps> {
  renderPart(title: string, chapters: ChapterProps[]) {
    if (chapters.length === 0) {
      return null
    }

    return (
      <div>
        <h3>{title}</h3>
        <ol className="{{title.toLowerCase()}}">
          {chapters.map(chapter => (
            <ChapterLink {...chapter} bookPermalink={this.props.permalink} key={chapter.id} />
          ))}
        </ol>
      </div>
    )
  }

  render() {
    const { title, permalink, defaultBranch: { frontmatter, mainmatter, backmatter } } = this.props

    return (
      <div className="row">
        <div className="col-md-7 main">
          <h1>
            <Link to={`/`}>Books</Link> - {title}
          </h1>
          <Link to={`/books/${permalink}/notes`}>Notes for this book</Link>
          <hr />
          {this.renderPart('Frontmatter', frontmatter)}
          {this.renderPart('Mainmatter', mainmatter)}
          {this.renderPart('Backmatter', backmatter)}
        </div>
      </div>
    )
  }
}

interface WrappedBookMatchParams {
  permalink: string;
}

interface WrappedBookProps extends RouteComponentProps<WrappedBookMatchParams> {}

export default class WrappedBook extends Component<WrappedBookProps> {
  render() {
    return (
      <QueryWrapper query={bookQuery} variables={{permalink: this.props.match.params.permalink}}>
        {(data) => { return <Book {...data.book} /> }}
      </QueryWrapper>
    )
  }
}
