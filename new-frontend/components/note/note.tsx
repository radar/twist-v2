import React, { FunctionComponent, useState } from "react";
import Link from "next/link"
import ReactMarkdown from "react-markdown";
import Gravatar from "react-gravatar";
import moment from "moment";

import Comments from "./Comments";
import CloseButton from "./CloseButton";
import OpenButton from "./OpenButton";
import EditForm from "./EditForm";

import CurrentUserContext from "../../CurrentUser/context";
import { Note } from "../../graphql/types";

type ElementNoteProps = Omit<Note, "element"> & {
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
          if (user.id !== currentUser!.id) {
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
    const { id } = props;
    if (state === "open") {
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
    <div className="p-4 note">
      <div className="flex">
        <div className="w-34 p-4">
          <Gravatar email={user.email} className="rounded-full" />
        </div>
        <div className="w-full">
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
            <div className="mt-4">
              <span className="text-sm mr-2">{renderToggleStateButton()}</span>
              <span className="text-sm">{renderEditButton()}</span>
            </div>
          </div>

          <Comments comments={comments} noteId={id} />
        </div>
      </div>
    </div>
  );
};

export default ElementNote;
