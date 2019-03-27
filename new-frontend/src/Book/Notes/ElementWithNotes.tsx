import * as React from "react"
import ReactMarkdown from "react-markdown"

import { BareElement } from '../Chapter/Element'

import {
  ElementWithNotesProps,
  ElementWithInfoProps,
  Note,
  ChapterProps,
  CommitProps,
} from './types';
import * as styles from "./ElementWithNotes.module.scss"


export class ElementWithInfo extends React.Component<ElementWithInfoProps> {
  renderChapterTitle(chapter: ChapterProps) {
    const { part, position, title } = chapter

    if (part === 'mainmatter') {
      return `${position}. ${title}`
    } else {
      return title
    }
  }

  renderCommitInfo(commit: CommitProps) {
    const { sha, branch: { name } } = commit

    return (
      <span>
        &nbsp;on {name} @ {sha.slice(0, 8)}
      </span>
    )
  }

  render() {
    const { chapter } = this.props

    return (
      <div className={this.props.className}>
        <BareElement {...this.props} />
        <span className={styles.chapterInfo}>
          From {this.renderChapterTitle(chapter)}
          {this.renderCommitInfo(chapter.commit)}
        </span>
      </div>
    )
  }
}


class ElementNote extends React.Component<Note> {
  render() {
    return (
      <div className={styles.note}>
        <div><strong>#{this.props.id} - {this.props.user.email}</strong></div>
        <ReactMarkdown source={this.props.text} />
      </div>
    )
  }
}

export default class ElementWithNotes extends React.Component<ElementWithNotesProps> {
  renderNotes() {
    return this.props.notes.map(
      note => <ElementNote key={note.id} {...note} />
    )
  }

  render() {
    return (
      <div className={styles.elementContainer}>
        <ElementWithInfo className={styles.element} {...this.props} />
        {this.renderNotes()}
      </div>
    )
  }
}
