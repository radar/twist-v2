import React from "react";

import QueryWrapper from "components/QueryWrapper";

import ElementWithNotes from "./ElementWithNotes";
import {
  BookNotesQuery,
  NoteState,
  useBookNotesQuery,
} from "../../graphql/types";

type ElementsWithNotes = BookNotesQuery["elementsWithNotes"];

type NoteListProps = {
  bookPermalink: string;
  elementsWithNotes: ElementsWithNotes;
};

export class NoteList extends React.Component<NoteListProps> {
  renderElements() {
    const { elementsWithNotes, bookPermalink } = this.props;
    return elementsWithNotes.map((element) => (
      <ElementWithNotes
        key={element.id}
        {...element}
        bookPermalink={bookPermalink}
      />
    ));
  }

  render() {
    return <div>{this.renderElements()}</div>;
  }
}

type WrappedNoteListProps = {
  bookPermalink: string;
  state: string;
};

const WrappedNoteList: React.FC<WrappedNoteListProps> = ({
  bookPermalink,
  state,
}) => {
  const variables = {
    bookPermalink: bookPermalink,
    state: state as NoteState,
  };

  const { data, loading, error } = useBookNotesQuery({ variables });

  const renderNotes = (data: BookNotesQuery) => {
    return (
      <NoteList
        bookPermalink={bookPermalink}
        elementsWithNotes={data.elementsWithNotes}
      />
    );
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderNotes(data)}
    </QueryWrapper>
  );
};

export default WrappedNoteList;
