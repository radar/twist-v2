import * as React from "react";

import QueryWrapper from "components/QueryWrapper";

import Header from "components/notes/Header";
import ElementWithInfo from "components/notes/ElementWithInfo";
import NoteBox from "components/notes/Note";
import { NoteQuery, useNoteQuery } from "graphql/types";
import { useRouter } from "next/router";

type NoteData = NoteQuery["note"];

type NoteProps = NoteData & {
  bookPermalink: string;
};

class Note extends React.Component<NoteProps> {
  render() {
    const { number, bookPermalink, element } = this.props;
    return (
      <div className="md:w-3/4">
        <div>
          <Header permalink={bookPermalink} noteNumber={number} />
          <ElementWithInfo {...element} bookPermalink={bookPermalink} />
          <NoteBox {...this.props} />
        </div>
      </div>
    );
  }
}

const WrappedNote = () => {
  const router = useRouter();
  const { number, bookPermalink } = router.query;

  const { data, loading, error } = useNoteQuery({
    variables: {
      number: parseInt(number as string),
      bookPermalink: bookPermalink as string,
    },
  });

  const renderNote = (data: NoteQuery) => {
    return <Note {...data.note} bookPermalink={bookPermalink as string} />;
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderNote(data)}
    </QueryWrapper>
  );
};

export default WrappedNote;
WrappedNote.auth = true;
