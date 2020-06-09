import React, { FunctionComponent, useState } from "react";
import ReactMarkdown from "react-markdown";
import Gravatar from "react-gravatar";
import moment from "moment";
import { Link } from "@reach/router";

import Comments from "./Comments";
import { Note } from "../Notes/types";
import CloseButton from "./CloseButton";
import OpenButton from "./OpenButton";
import * as styles from "./Note.module.scss";
import EditForm from "./EditForm";

import CurrentUserContext from "../../CurrentUser/context";

type ElementNoteProps = Note & {
  bookPermalink: string;
};

const ElementNote: FunctionComponent<ElementNoteProps> = (props) => {
  const { user, createdAt, bookPermalink, number, id, text, comments } = props;
  const [state, setState] = useState<string>(props.state);
  const [showForm, setShowForm] = useState<boolean>(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const renderEditButton = () => {
    if (showForm) {
      return;
    }

    return (
      <CurrentUserContext.Consumer>
        {(currentUser) => {
          if (user.id != currentUser!.id) {
            return;
          }

          return (
            <button className="btn btn-blue" onClick={toggleForm}>
              Edit
            </button>
          );
        }}
      </CurrentUserContext.Consumer>
    );
  };

  const renderToggleStateButton = () => {
    const { id, state } = props;
    if (state == "open") {
      return <CloseButton id={id} setState={setState} />;
    }

    return <OpenButton id={id} setState={setState} />;
  };

  const renderFormOrText = () => {
    if (showForm) {
      return (
        <EditForm toggleForm={toggleForm} noteId={id} originalText={text} />
      );
    } else {
      return <ReactMarkdown source={text} />;
    }
  };

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
            {renderFormOrText()}
            <div className={`${styles.buttons} mt-4 text-sm`}>
              {renderEditButton()}
            </div>
            <div className={`${styles.buttons} mt-4 text-sm`}>
              {renderToggleStateButton()}
            </div>
          </div>

          <Comments comments={comments} noteId={id} />
        </div>
      </div>
    </div>
  );
};

export default ElementNote;
