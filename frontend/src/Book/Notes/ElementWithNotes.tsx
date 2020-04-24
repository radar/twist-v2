import * as React from "react";

import { ElementWithNotesProps } from "./types";

import ElementWithInfo from "./ElementWithInfo";
import Note from "../Note/Note";

export default class ElementWithNotes extends React.Component<
  ElementWithNotesProps
> {
  renderNotes() {
    const { bookPermalink, notes } = this.props;
    return notes.map((note) => (
      <Note bookPermalink={bookPermalink} key={note.id} {...note} />
    ));
  }

  render() {
    return (
      <div className="flex border-2 mb-8">
        <div className="w-1/3 bg-gray-100">
          <ElementWithInfo className="element p-4" {...this.props} />
        </div>
        <div className="w-2/3">{this.renderNotes()}</div>
      </div>
    );
  }
}
