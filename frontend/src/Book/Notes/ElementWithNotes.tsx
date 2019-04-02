import * as React from "react"

import {
  ElementWithNotesProps,
} from './types';

import ElementWithInfo from './ElementWithInfo'
import Note from '../Note/Note'
import * as styles from "./ElementWithNotes.module.scss"

export default class ElementWithNotes extends React.Component<ElementWithNotesProps> {
  renderNotes() {
    const {bookPermalink, notes} = this.props
    return notes.map(
      note => <Note bookPermalink={bookPermalink} key={note.id} {...note} />
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
