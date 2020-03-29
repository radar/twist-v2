import React, { Component } from "react";
import Notes from "./Notes";
import * as styles from "./Element.module.scss";
import { Note } from "../Notes/types";

type Image = {
  path: string;
  caption: string;
};

export type BareElementProps = {
  bookPermalink: string;
  id: string;
  content: string;
  tag: string;
  identifier: string;
  image?: Image;
  notes: Array<Note>;
};

type ImageElementProps = {
  id: string;
  image: Image;
};

const Image = (props: ImageElementProps) => {
  const {
    id,
    image: { path, caption }
  } = props;

  const fullPath =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_API_HOST + path
      : path;
  return (
    <div className="element image" id={id}>
      <figure>
        <img src={fullPath} />
        <figcaption>{caption}</figcaption>
      </figure>
    </div>
  );
};

export class BareElement extends Component<BareElementProps> {
  createMarkup() {
    return { __html: this.props.content };
  }

  render() {
    const { tag, image, id } = this.props;
    if (tag === "img" && image) {
      return <Image image={image} id={id} />;
    }

    return (
      <div className="element" dangerouslySetInnerHTML={this.createMarkup()} />
    );
  }
}

type ElementState = {
  showForm: boolean;
  noteCount: number;
  notes: Array<Note>;
};

export type ElementProps = BareElementProps & {
  noteCount: number;
};

export default class Element extends Component<ElementProps, ElementState> {
  state = {
    showForm: false,
    notes: this.props.notes,
    noteCount: this.props.noteCount
  };

  renderNotesCount() {
    const count = this.state.noteCount;
    return count === 1 ? "1 note +" : `${count} notes +`;
  }

  toggleForm = (event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    this.setState({ showForm: !this.state.showForm });
  };

  noteSubmitted = (note: Note) => {
    this.toggleForm();
    let notes = this.state.notes;
    notes = notes.concat(note);
    this.setState({ notes: notes, noteCount: this.state.noteCount + 1 });
  };

  renderNotes() {
    if (!this.state.showForm) {
      return;
    }
    const { bookPermalink, id } = this.props;
    return (
      <Notes
        notes={this.state.notes}
        bookPermalink={bookPermalink}
        noteSubmitted={this.noteSubmitted}
        elementId={id}
      />
    );
  }

  render() {
    const { identifier, id, tag } = this.props;
    return (
      <div className="relative element">
        <a id={identifier || id} />
        <span
          className={`${styles.note_button} note_button_${tag}`}
          id={`note_button_${id}`}
        >
          <a href="#" onClick={this.toggleForm}>
            {this.renderNotesCount()}
          </a>
        </span>
        <BareElement {...this.props} />
        {this.renderNotes()}
      </div>
    );
  }
}
