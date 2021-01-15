import React, { Component, useState } from "react";
import Notes from "./Notes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import {
  ElementWithInfoFragment,
  Image as ImageType,
} from "../../graphql/types";

type ImageElementProps = {
  id: string;
  image: ImageType;
};

const Image = (props: ImageElementProps) => {
  const {
    id,
    image: { path, caption },
  } = props;

  const fullPath =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_HOST + path
      : path;
  return (
    <div className="element image" id={id}>
      <figure>
        <img src={fullPath} alt={caption as string} />
        <figcaption>{caption}</figcaption>
      </figure>
    </div>
  );
};

type BareElementProps = Omit<ElementWithInfoFragment, "chapter" | "notes">;

export class BareElement extends Component<BareElementProps> {
  createMarkup() {
    return { __html: this.props.content as string };
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

export type ElementProps = BareElementProps & {
  bookPermalink: string;
  id: string;
  noteCount: number;
};

const Element: React.FC<ElementProps> = (props) => {
  const { noteCount: initialNoteCount, id, bookPermalink } = props;
  const [noteCount, setNoteCount] = useState<number>(initialNoteCount);
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const renderNotesCount = () => {
    return noteCount === 1 ? "1" : `${noteCount}`;
  };

  const toggleNotes = (event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    setShowNotes(!showNotes);
  };

  const noteSubmitted = () => {
    toggleNotes();
    setNoteCount(noteCount + 1);
  };

  const renderNotes = () => {
    if (!showNotes) {
      return;
    }
    return (
      <Notes
        bookPermalink={bookPermalink}
        noteSubmitted={noteSubmitted}
        elementId={id}
      />
    );
  };

  return (
    <div className="relative element">
      <span className={`absolute note-button`} id={`note_button_${id}`}>
        <button type="button" className="fa-stack fa-fw" onClick={toggleNotes}>
          <FontAwesomeIcon
            icon={faComment}
            size="2x"
            color="#3182ce"
            flip="horizontal"
          />
          <span className="text-blue-600 mt-1 text-sm font-bold fa-stack-1x no-underline">
            {renderNotesCount()}
          </span>
        </button>
      </span>
      <div id={id}>
        <BareElement {...props} />
      </div>
      {renderNotes()}
    </div>
  );
};

export default Element;
