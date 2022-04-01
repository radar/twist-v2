import { useRouter } from "next/router";
import * as React from "react";

import Header from "components/notes/Header";
import List from "components/notes/List";

type NotesProps = {
  bookPermalink: string;
};

type NotesState = {
  currentState: string;
};

export class Notes extends React.Component<NotesProps, NotesState> {
  state = {
    currentState: "OPEN",
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
      <div className="main">
        <Header permalink={bookPermalink} />
        <div className="notes mt-4">
          <div className="mb-4">
            <button className="btn btn-green mr-2" onClick={this.showOpenNotes}>
              Open Notes
            </button>
            <button className="btn btn-red" onClick={this.showClosedNotes}>
              Closed Notes
            </button>
          </div>
          <List state={this.state.currentState} bookPermalink={bookPermalink} />
        </div>
      </div>
    );
  }
}

const WrappedNotes = () => {
  const router = useRouter();
  const { bookPermalink } = router.query;
  return <Notes bookPermalink={bookPermalink as string} />;
};

export default WrappedNotes;

WrappedNotes.auth = true;
