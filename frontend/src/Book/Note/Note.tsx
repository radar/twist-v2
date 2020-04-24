import * as React from "react";
import ReactMarkdown from "react-markdown";
import Gravatar from "react-gravatar";
import moment from "moment";
import { Link } from "@reach/router";

import Comment from "./Comments/Comment";
import Comments from "./Comments";
import { Note, Comment as CommentType } from "../Notes/types";
import CloseButton from "./CloseButton";
import OpenButton from "./OpenButton";
import * as styles from "./Note.module.scss";

type ElementNoteProps = Note & {
  bookPermalink: string;
};

type ElementNoteState = {
  comments: CommentType[];
  state: string;
};

export default class ElementNote extends React.Component<
  ElementNoteProps,
  ElementNoteState
> {
  state = {
    state: this.props.state,
    comments: this.props.comments,
  };

  updateState = (state: string) => {
    this.setState({ state: state });
  };

  stateClass() {
    return this.state.state == "open" ? styles.openState : styles.closedState;
  }

  renderComments() {
    const { comments } = this.state;

    return comments.map((comment) => <Comment {...comment} />);
  }

  updateComments = (comments: CommentType[]) => {
    this.setState({ comments: comments });
  };

  renderToggleStateButton() {
    const { id, state } = this.props;
    if (state == "open") {
      return <CloseButton id={id} updateState={this.updateState} />;
    }

    return <OpenButton id={id} updateState={this.updateState} />;
  }

  render() {
    const { state } = this.state;
    const { user, text, createdAt, bookPermalink, id, number } = this.props;
    const time = moment(createdAt).fromNow();

    return (
      <div className={`${styles.note} note`}>
        <div className="flex">
          <div className={`${styles.avatar} w-34 p-4`}>
            <Gravatar email={user.email} />
          </div>
          <div className={`w-full`}>
            <div className="row">
              <div className={`bg-gray-200 px-4 py-2 rounded-t-md`}>
                <div>
                  <Link to={`/books/${bookPermalink}/notes/${number}`}>
                    {user.name} left note #{number}
                  </Link>
                </div>
                <div>
                  <small>{time}</small>
                </div>
              </div>
            </div>
            <div className="p-4 b-4 border">
              <ReactMarkdown source={text} />
              <div className={`${styles.buttons} mt-4 text-sm`}>
                {this.renderToggleStateButton()}
              </div>
            </div>

            <Comments noteId={this.props.id} />
          </div>
        </div>
      </div>
    );
  }
}
