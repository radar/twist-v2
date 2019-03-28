import * as React from "react"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"

import {Note} from './types'
import * as styles from './Note.module.scss'

type ElementNoteProps = Note & {
  bookPermalink: string
}

export default class ElementNote extends React.Component<ElementNoteProps> {
  render() {
    const {id, bookPermalink, user, text} = this.props
    const path = `/books/${bookPermalink}/notes/${id}`
    return (
      <div className={styles.note}>
        <div>
          <strong>
            <Link to={path}>Note #{id}</Link> - {user.email}</strong>
          </div>
        <ReactMarkdown source={text} />
      </div>
    )
  }
}
