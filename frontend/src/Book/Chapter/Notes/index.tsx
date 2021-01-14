import React, { useState } from "react";
import Note from "../../Note/Note";
import Form from "./Form";
import {
  ChapterNotesQuery,
  useChapterNotesQuery,
} from "../../../graphql/types";
import PermissionDenied from "../../../PermissionDenied";
import QueryWrapper from "../../../QueryWrapper";

export type NotesType = ChapterNotesBook["notes"];

interface NotesProps {
  bookPermalink: string;
  notes: NotesType;
  noteSubmitted: () => void;
  elementId: string;
}

type ChapterNotesBook = Extract<
  ChapterNotesQuery["book"],
  { __typename?: "Book" }
>;

const Notes: React.FC<NotesProps> = ({
  bookPermalink,
  elementId,
  notes: initialNotes,
  noteSubmitted,
}) => {
  const [notes, setNotes] = useState<NotesType>(initialNotes);
  const renderNotes = () => {
    if (notes.length === 0) {
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
  };

  const noteSubmitted2 = (note: NotesType[0]) => {
    let newNotes = [...notes];
    setNotes(newNotes.concat(note));
    noteSubmitted();
  };

  return (
    <div className="border-2 rounded p-2 mb-4" key={`notes-${elementId}`}>
      {renderNotes()}
      <Form
        bookPermalink={bookPermalink}
        elementId={elementId}
        noteSubmitted={noteSubmitted2}
      />
    </div>
  );
};

interface WrappedNotesProps {
  bookPermalink: string;
  elementId: string;
  noteSubmitted: () => void;
}

const WrappedNotes: React.FC<WrappedNotesProps> = ({
  bookPermalink,
  elementId,
  noteSubmitted,
}) => {
  const { data, loading, error } = useChapterNotesQuery({
    variables: { elementId, bookPermalink },
  });

  const renderNotes = (data: ChapterNotesQuery) => {
    const { book } = data;
    if (book.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    return (
      <Notes
        notes={book.notes}
        bookPermalink={bookPermalink}
        elementId={elementId}
        noteSubmitted={noteSubmitted}
      />
    );
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderNotes(data)}
    </QueryWrapper>
  );
};

export default WrappedNotes;
