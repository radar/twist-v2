import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import QueryWrapper from '../../QueryWrapper'
import chapterQuery from './ChapterQuery'
import Element from './Element'
import { PreviousChapterLink, NextChapterLink } from './Link'
import SectionList from './SectionList'

type ElementProps = {
  id: string,
  content: string,
  tag: string,
  noteCount: number,
  image: {
    path: string
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

export type NavigationalChapter = {
  id: string,
  permalink: string,
  part: string,
  title: string,
  position: number,
  bookPermalink: string
}

type ChapterProps = {
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
        nextChapter: NavigationalChapter
      }
    }
  }
}

export const chapterPositionAndTitle = (part: string, position: number, title: string) => {
  if (part === 'mainmatter') {
    return `${position}. ${title}`
  } else {
    return title
  }
}


class Chapter extends Component<ChapterProps> {
  render() {
    const { book } = this.props

    const {
      permalink: bookPermalink,
      defaultBranch: {
        chapter: {
          part,
          title: chapterTitle,
          position,
          elements,
          sections,
          previousChapter,
          nextChapter
        }
      }
    } = book

    const positionAndTitle = chapterPositionAndTitle(part, position, chapterTitle)

    return (
      <div className="row">
        <div id="chapter" className="main col-md-7">
          <h1>
            <Link id="top" to={`/books/${bookPermalink}`}>
              {book.title}
            </Link>
          </h1>
          <h2>{positionAndTitle}</h2>
          {elements.map(element => <Element {...element} key={element.id} />)}
        </div>

        <div className="col-md-4">
          <div id="sidebar">
            <PreviousChapterLink {...previousChapter} bookPermalink={bookPermalink} />
            <hr />

            <h4>
              <a href="#top">{positionAndTitle}</a>
            </h4>

            <SectionList sections={sections} />

            <hr />
            <NextChapterLink {...nextChapter} bookPermalink={bookPermalink} />
          </div>
        </div>
      </div>
    )
  }
}

interface WrappedChapterMatchParams {
  bookPermalink: string;
  chapterPermalink: string;
}

interface WrappedChapterProps extends RouteComponentProps<WrappedChapterMatchParams> {}

class WrappedChapter extends React.Component<WrappedChapterProps> {
  render() {
    const {bookPermalink, chapterPermalink} = this.props.match.params
    return (
      <QueryWrapper query={chapterQuery} variables={{bookPermalink, chapterPermalink}}>
        {(data) => {
          return <Chapter book={data.book} />
        }}
      </QueryWrapper>
    )
  }
}

export default WrappedChapter
