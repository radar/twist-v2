// import @flow

import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { Link } from 'react-router-dom'

import errorWrapper from 'modules/error_wrapper'
import loadingWrapper from 'modules/loading_wrapper'

import { Element } from './element'
import SectionList from './section_list'
import { chapterWithData } from './container'

type ElementProps = {
  id: string,
  content: string,
  tag: string,
  noteCount: number,
  image: {
    path: string,
  }
}

type SubsectionProps = {
  id: string,
  title: string,
  link: string
}

type SectionProps = {
  id: string,
  title: string,
  link: string,
  subsections: Array<SubsectionProps>
}

type NavigationalChapter = {
  id: string,
  permalink: string,
  part: string,
  title: string,
  position: number,
  bookPermalink: string,
}

type ChapterProps = {
  data: {
    book: {
      title: string,
      permalink: string,
      defaultBranch: {
        chapter: {
          title: string,
          position: number,
          part: string,
          elements: Array<ElementProps>,
          sections: Array<SectionProps>,
          previousChapter: NavigationalChapter,
          nextChapter: NavigationalChapter,
        }
      }
    }
  }
}

const chapterPositionAndTitle = (part, position, title) => {
  if (part === 'mainmatter') {
    return `${position}. ${title}`
  } else {
    return title
  }
}

class PreviousChapterLink extends Component<NavigationalChapter> {
  render() {
    const { id, part, position, title, permalink, bookPermalink } = this.props

    if (typeof id === 'undefined') { return null }

    const text = chapterPositionAndTitle(part, position, title)

    return (
      <Link to={`/books/${bookPermalink}/chapters/${permalink}`}>&laquo; {text}</Link>
    )
  }
}

class NextChapterLink extends Component<NavigationalChapter> {
  render() {
    const { id, part, position, title, permalink, bookPermalink } = this.props

    if (id === '') { return null }

    const text = chapterPositionAndTitle(part, position, title)

    return (
      <Link to={`/books/${bookPermalink}/chapters/${permalink}`}>{text} &raquo;</Link>
    )
  }
}

class Chapter extends Component<ChapterProps> {
  render() {
    const { data: { book } } = this.props

    const {
      permalink: bookPermalink,
      defaultBranch: { chapter: { part, title: chapterTitle, position, elements, sections, previousChapter, nextChapter } }
    } = book

    const positionAndTitle = chapterPositionAndTitle(part, position, chapterTitle)

    return (
      <div className="row">
        <div id="chapter" className="main col-md-7">
          <h1>
            <Link name='top' to={`/books/${bookPermalink}`}>{book.title}</Link>
          </h1>
          <h2>{positionAndTitle}</h2>
          {elements.map(element => <Element {...element} key={element.id} />)}
        </div>

        <div className="col-md-4">
          <div id="sidebar">
            <PreviousChapterLink {...previousChapter} bookPermalink={bookPermalink} />
            <hr />

            <h4><a href='#top'>{positionAndTitle}</a></h4>

            <SectionList sections={sections} />

            <hr />
            <NextChapterLink {...nextChapter} bookPermalink={bookPermalink} />
          </div>
        </div>
      </div>
    )
  }
}

export default compose(chapterWithData)(errorWrapper(loadingWrapper(Chapter)))
