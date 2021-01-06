import * as React from "react";
import { RouteComponentProps } from "@reach/router";

import QueryWrapper from "../../QueryWrapper";

import Header from "../Notes/Header";
import ElementWithInfo from "../Notes/ElementWithInfo";
import NoteBox from "./Note";
import { NoteQuery, useNoteQuery } from "../../graphql/types";

type NoteData = NoteQuery["note"];

type NoteProps = NoteData & {
  bookPermalink: string;
};

class Note extends React.Component<NoteProps> {
  render() {
    const { number, bookPermalink, element } = this.props;
    return (
      <div className="main md:w-3/4">
        <div>
          <Header permalink={bookPermalink} noteNumber={number} />
          <ElementWithInfo {...element} bookPermalink={bookPermalink} />
          <NoteBox {...this.props} />
        </div>
      </div>
    );
  }
}

interface WrappedNoteMatchParams {
  number: string;
  bookPermalink: string;
}

interface WrappedNoteProps
  extends RouteComponentProps<WrappedNoteMatchParams> {}

const WrappedNote: React.FC<WrappedNoteProps> = ({ number, bookPermalink }) => {
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
