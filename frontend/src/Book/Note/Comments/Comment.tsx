import React, { FunctionComponent, useState } from "react";
import ReactMarkdown from "react-markdown";
import Gravatar from "react-gravatar";
import moment from "moment";

import { Comment as CommentType } from "../../../graphql/types";

import EditButton from "./EditButton";
import EditForm from "./EditForm";
import Delete from "./Delete";

const Comment: FunctionComponent<CommentType> = (props) => {
  const { id, user, createdAt } = props;
  const [text, setText] = useState<string>(props.text);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const time = moment(createdAt).fromNow();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const renderFormOrText = () => {
    if (showForm) {
      return (
        <EditForm
          updateText={(text: string) => setText(text)}
          toggleForm={toggleForm}
          id={id}
          originalText={text}
        />
      );
    } else {
      return <ReactMarkdown source={text} />;
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <div data-test-class="comment">
      <div className="flex">
        <div className="w-34 p-4">
          <Gravatar email={user.email} className="rounded-full" />
        </div>

        <div className="w-full">
          <div className="bg-gray-200 px-4 py-2 rounded-t-md">
            {user.name} commented {time}
          </div>
          <div className="p-4 b-4 border mb-4">
            {renderFormOrText()}
            <div className="mt-4 text-sm">
              <EditButton
                showForm={showForm}
                toggleForm={toggleForm}
                user={user}
              />
              <Delete hideComment={() => setHidden(true)} user={user} id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
