import * as React from "react"
import ReactMarkdown from "react-markdown"
import Gravatar from "react-gravatar"
import moment from "moment"
import { Link } from "react-router-dom"

import {Note} from '../Notes/types'
import * as styles from './Note.module.scss'


type ElementNoteProps = Note & {
  bookPermalink: string
}

type ElementNoteState = {
  state: string
}

export default class ElementNote extends React.Component<ElementNoteProps, ElementNoteState> {
  state = {
    state: this.props.state
  }

  updateState = (state: string) => {
    this.setState({state: state})
  }

  renderState() {
    const {state} = this.props
    if (state == "open") {
      return (
        <span className={styles.openState}>Open</span>
      )
    } else {
      return (
        <span className={styles.closedState}>Closed</span>
      )
    }
  }

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
                <Link to={`/books/${bookPermalink}/notes/${id}`}>{user.name} left a note {time}</Link> -
                &nbsp;{this.renderState()}
              </div>
            </div>
            <div className="row">
              <div className={`${styles.noteBody} col-md-12`}>
                <ReactMarkdown source={text} />
                <div className={styles.buttons}>
                  <CloseButton id={id} updateState={this.updateState} />
                  <OpenButton id={id} updateState={this.updateState} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
