import * as React from "react";
import { RouteComponentProps } from "@reach/router";

import Header from "./Header";
import List from "./List";
import * as styles from "./Notes.module.scss";

type NotesProps = {
  bookPermalink: string;
};

type NotesState = {
  currentState: string;
};

export class Notes extends React.Component<NotesProps, NotesState> {
  state = {
    currentState: "OPEN"
  };

  showOpenNotes = () => {
    this.setState({ currentState: "OPEN" });
  };

  showClosedNotes = () => {
    this.setState({ currentState: "CLOSED" });
  };

  render() {
    const { bookPermalink } = this.props;
    return (
      <div className="main col-md-10">
        <Header permalink={bookPermalink} />
        <div className="notes">
          <div className={styles.buttons}>
            <button className="btn btn-success" onClick={this.showOpenNotes}>
              Open Notes
            </button>
            <button className="btn btn-danger" onClick={this.showClosedNotes}>
              Closed Notes
            </button>
          </div>
          <List state={this.state.currentState} bookPermalink={bookPermalink} />
        </div>
      </div>
    );
  }
}

interface WrappedNotesMatchParams {
  bookPermalink: string;
}

interface WrappedNotesProps
  extends RouteComponentProps<WrappedNotesMatchParams> {}

export default class WrappedNotes extends React.Component<WrappedNotesProps> {
  render() {
    const { bookPermalink } = this.props;
    return <Notes bookPermalink={bookPermalink as string} />;
  }
}
