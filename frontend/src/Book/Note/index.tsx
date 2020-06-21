import * as React from "react";
import { RouteComponentProps } from "@reach/router";

import QueryWrapper from "../../QueryWrapper";

import Header from "../Notes/Header";
import NoteQuery from "./NoteQuery";
import { Note as NoteType } from "../Notes/types";
import ElementWithInfo from "../Notes/ElementWithInfo";
import NoteBox from "./Note";

type NoteProps = NoteType & {
  bookPermalink: string;
};

class Note extends React.Component<NoteProps> {
  render() {
    const { number, bookPermalink, element } = this.props;
    return (
      <div className="main md:w-3/4">
        <div>
          <Header permalink={bookPermalink} noteNumber={number} />
          <ElementWithInfo {...element} />
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

export default class WrappedNote extends React.Component<WrappedNoteProps> {
  render() {
    const { number, bookPermalink } = this.props;

    return (
      <QueryWrapper
        query={NoteQuery}
        variables={{
          number: parseInt(number as string),
          bookPermalink: bookPermalink,
        }}
      >
        {({ note }: { note: NoteType }) => {
          return <Note bookPermalink={bookPermalink!} {...note} />;
        }}
      </QueryWrapper>
    );
  }
}
