import * as React from "react"
import ReactMarkdown from "react-markdown"
import Gravatar from "react-gravatar"
import moment from "moment"
import { Link } from "react-router-dom"

import {Note} from './types'
import * as styles from './Note.module.scss'

type ElementNoteProps = Note & {
  bookPermalink: string
}

export default class ElementNote extends React.Component<ElementNoteProps> {
  render() {
    const {user, text, createdAt, bookPermalink, id} = this.props
    const time = moment(createdAt).fromNow();

    return (
      <div className={styles.note}>
        <div className="row">
          <div className={`${styles.avatar} col-md-1`}>
            <Gravatar email={user.email} />
          </div>

          <div className={`${styles.noteContainer} col-md-11`}>
            <div className="row">
              <div className={`${styles.noteHeader} col-md-12`}>
                <Link to={`/books/${bookPermalink}/notes/${id}`}>{user.name} left a note {time}</Link>
              </div>
            </div>
            <div className="row">
              <div className={`${styles.noteBody} col-md-12`}>
                <ReactMarkdown source={text} />
                {/* <button className={styles.closeButton}>Close</button>
                <button className={styles.openButton}>Open</button> */}
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
