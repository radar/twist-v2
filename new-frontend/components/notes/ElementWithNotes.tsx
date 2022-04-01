import * as React from "react";

import ElementWithInfo from "./ElementWithInfo";
import Note from "./Note";
import { BookNotesQuery } from "../../graphql/types";

type ElementWithNotesProps = BookNotesQuery["elementsWithNotes"][0] & {
  bookPermalink: string;
};

export default class ElementWithNotes extends React.Component<ElementWithNotesProps> {
  renderNotes() {
    const { bookPermalink, notes } = this.props;
    return notes.map((note) => (
      <Note bookPermalink={bookPermalink} key={note.id} {...note} />
    ));
  }

  render() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 border-2 mb-8 bg-white">
        <div className="w-full bg-gray-100 border-r-2 border-gray-200">
          <ElementWithInfo className="element p-4" {...this.props} />
        </div>
        <div className="w-full">{this.renderNotes()}</div>
      </div>
    );
  }
}
