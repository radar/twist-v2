import * as React from "react";
import { RouteComponentProps } from "@reach/router";

import QueryWrapper from "../../QueryWrapper";

import Header from "../Notes/Header";
import NoteQuery from "./NoteQuery";
import { ElementWithInfoProps, Note as NoteType } from "../Notes/types";
import ElementWithInfo from "../Notes/ElementWithInfo";
import NoteBox from "./Note";

import Comments from "./Comments";

import styles from "./NoteContainer.module.scss";

type NoteProps = NoteType & {
  element: ElementWithInfoProps;
  bookPermalink: string;
};

class Note extends React.Component<NoteProps> {
  renderComments() {
    return <Comments noteId={this.props.id} />;
  }

  render() {
    const { number, bookPermalink, element } = this.props;
    return (
      <div className="main md:w-3/4">
        <div className={styles.noteContainer}>
          <Header permalink={bookPermalink} noteNumber={number} />
          <ElementWithInfo bookPermalink={bookPermalink} {...element} />
          <NoteBox {...this.props} />
          {this.renderComments()}
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
          bookPermalink: bookPermalink
        }}
      >
        {({ note }) => {
          return <Note bookPermalink={bookPermalink} {...note} />;
        }}
      </QueryWrapper>
    );
  }
}
