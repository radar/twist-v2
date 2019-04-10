import * as React from "react"

import {
  ElementWithInfoProps,
  ChapterProps,
  CommitProps,
} from "./types"

import { BareElement } from '../Chapter/Element'
import * as styles from "./ElementWithInfo.module.scss"

export default class ElementWithInfo extends React.Component<ElementWithInfoProps> {
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
