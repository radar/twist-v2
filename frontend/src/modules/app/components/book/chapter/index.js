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
  noteCount: number
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
          sections: Array<SectionProps>
        }
      }
    }
  }
}

class Chapter extends Component<ChapterProps> {
  render() {
    const { data: { book } } = this.props

    const {
      permalink: bookPermalink,
      defaultBranch: { chapter: { title: chapterTitle, position, elements, sections } }
    } = book

    return (
      <div className="row">
        <div id="chapter" className="main col-md-7">
          <h1>
            <Link to={`/books/${bookPermalink}`}>{book.title}</Link>
          </h1>
          <h2>
            {position}. {chapterTitle}
          </h2>
          {elements.map(element => <Element {...element} key={element.id} />)}
        </div>

        <div className="col-md-4">
          <div id="sidebar">
            <strong id="previous_chapter">PREVIOUS CHAPTER</strong>
            <SectionList sections={sections} />
            <strong id="next_chapter">NEXT CHAPTER</strong>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(chapterWithData)(errorWrapper(loadingWrapper(Chapter)))
