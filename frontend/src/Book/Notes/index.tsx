import * as React from "react";
import { RouteComponentProps } from 'react-router'

import Header from './Header'
import List from './List'

type NotesProps = {
  bookPermalink: string,
}

type NotesState = {
  currentState: string;
}

export class Notes extends React.Component<NotesProps, NotesState> {
  state = {
    currentState: 'open'
  }

  render() {
    const {bookPermalink} = this.props;
    return (
      <div className="main col-md-10">
        <Header permalink={bookPermalink} />
        <div className="notes">
          <List state={this.state.currentState} bookPermalink={bookPermalink} />
        </div>
      </div>
    )
  }
}

interface WrappedNotesMatchParams {
  bookPermalink: string;
}

interface WrappedNotesProps extends RouteComponentProps<WrappedNotesMatchParams> {}

export default class WrappedNotes extends React.Component<WrappedNotesProps> {
  render() {
    const {bookPermalink} = this.props.match.params
    return (<Notes bookPermalink={bookPermalink} />)
  }
}
