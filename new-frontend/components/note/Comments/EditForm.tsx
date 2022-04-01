import React, { FunctionComponent, useState } from "react";
import updateCommentMutation from "../../../graphql/queries/mutations/updateCommentMutation";

import { useMutation } from "@apollo/client";

interface EditFormProps {
  toggleForm: () => void;
  updateText: (text: string) => void;
  originalText: string;
  id: string;
}

const EditForm: FunctionComponent<EditFormProps> = (props) => {
  const { id, originalText, toggleForm } = props;
  const [text, setText] = useState<string>(props.originalText);
  const [updateComment] = useMutation(updateCommentMutation);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    updateComment({ variables: { id: id, text: text } }).then((response) => {
      toggleForm();
      props.updateText(text);
    });
  };

  const checkForSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.metaKey && e.key === "Enter") {
      submit(e);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <p>
          <label
            htmlFor={`comment_${id}_text`}
            className="block font-bold mb-2"
          >
            Note
          </label>
          <textarea
            className="h-32 w-full border p-2 mb-2"
            id={`comment_${id}_text`}
            defaultValue={originalText}
            onKeyDown={checkForSubmit}
            onChange={(e) => setText(e.target.value)}
          />
        </p>
        <input
          type="submit"
          className="btn btn-blue mb-2"
          value="Update Comment"
        />
      </form>
    </div>
  );
};

export default EditForm;
