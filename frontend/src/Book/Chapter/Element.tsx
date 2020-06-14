import React, { Component } from "react";
import Notes from "./Notes";
import * as styles from "./Element.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

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
};

type ImageElementProps = {
  id: string;
  image: Image;
};

const Image = (props: ImageElementProps) => {
  const {
    id,
    image: { path, caption },
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
  showNotes: boolean;
  noteCount: number;
};

export type ElementProps = BareElementProps & {
  noteCount: number;
};

export default class Element extends Component<ElementProps, ElementState> {
  state = {
    showNotes: false,
    noteCount: this.props.noteCount,
  };

  renderNotesCount() {
    const count = this.state.noteCount;
    return count === 1 ? "1" : `${count}`;
  }

  toggleNotes = (event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    this.setState({ showNotes: !this.state.showNotes });
  };

  noteSubmitted = () => {
    this.toggleNotes();
    this.setState({ noteCount: this.state.noteCount + 1 });
  };

  renderNotes() {
    if (!this.state.showNotes) {
      return;
    }
    const { bookPermalink, id } = this.props;
    return (
      <Notes
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
          <span className="fa-stack fa-fw">
            <FontAwesomeIcon
              icon={faComment}
              size="2x"
              color="#3182ce"
              flip="horizontal"
            />
            <a href="#" onClick={this.toggleNotes} className="fa-stack-1x">
              {this.renderNotesCount()}
            </a>
          </span>
        </span>
        <BareElement {...this.props} />
        {this.renderNotes()}
      </div>
    );
  }
}
