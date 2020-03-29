import React from "react";
import { Note as NoteType } from "../../Notes/types";
import Note from "../../Note/Note";
import Form from "./Form";

interface NotesProps {
  bookPermalink: string;
  notes: Array<NoteType>;
  noteSubmitted: (note: NoteType) => void;
  elementId: string;
}

class Notes extends React.Component<NotesProps> {
  renderNotes() {
    const { notes, bookPermalink } = this.props;
    if (notes.length == 0) {
      return null;
    }

    return (
      <div>
        <h3>Previous Notes</h3>
        {notes.map(note => (
          <Note key={note.id} bookPermalink={bookPermalink} {...note} />
        ))}
      </div>
    );
  }
  render() {
    const { bookPermalink, elementId, noteSubmitted } = this.props;
    return (
      <div className="border-2 rounded p-2 mb-4" key={`notes-${elementId}`}>
        {this.renderNotes()}
        <Form
          bookPermalink={bookPermalink}
          elementId={elementId}
          noteSubmitted={noteSubmitted}
        />
      </div>
    );
  }
}

export default Notes;
