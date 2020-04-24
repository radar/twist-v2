import React from "react";
import { Note as NoteType } from "../../Notes/types";
import Note from "../../Note/Note";
import Form from "./Form";
import QueryWrapper from "../../../QueryWrapper";
import notesQuery from "./notesQuery";

interface NotesProps {
  bookPermalink: string;
  notes: Array<NoteType>;
  noteSubmitted: () => void;
  elementId: string;
}

interface NotesState {
  notes: Array<NoteType>;
}

class Notes extends React.Component<NotesProps, NotesState> {
  state = {
    notes: this.props.notes,
  };

  renderNotes() {
    const { bookPermalink } = this.props;
    const { notes } = this.state;
    if (notes.length == 0) {
      return null;
    }

    return (
      <div>
        <h3>Previous Notes</h3>
        {notes.map((note) => (
          <Note key={note.id} bookPermalink={bookPermalink} {...note} />
        ))}
      </div>
    );
  }

  noteSubmitted = (note: NoteType) => {
    let notes = this.state.notes;
    notes = notes.concat(note);
    this.setState({ notes: notes });
    this.props.noteSubmitted();
  };

  render() {
    const { bookPermalink, elementId } = this.props;
    return (
      <div className="border-2 rounded p-2 mb-4" key={`notes-${elementId}`}>
        {this.renderNotes()}
        <Form
          bookPermalink={bookPermalink}
          elementId={elementId}
          noteSubmitted={this.noteSubmitted}
        />
      </div>
    );
  }
}

interface WrappedNotesProps {
  bookPermalink: string;
  elementId: string;
  noteSubmitted: () => void;
}

class WrappedNotes extends React.Component<WrappedNotesProps> {
  render() {
    const { bookPermalink, elementId, noteSubmitted } = this.props;
    return (
      <QueryWrapper
        fetchPolicy="network-only"
        query={notesQuery}
        variables={{ elementId, bookPermalink }}
      >
        {(data) => {
          const {
            book: { notes },
          } = data;
          return (
            <Notes
              notes={notes}
              bookPermalink={bookPermalink}
              elementId={elementId}
              noteSubmitted={noteSubmitted}
            />
          );
        }}
      </QueryWrapper>
    );
  }
}

export default WrappedNotes;
