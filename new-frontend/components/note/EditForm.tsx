import React, { FunctionComponent, useState } from "react";
import updateNoteMutation from "../../graphql/queries/mutations/updateNoteMutation";

import { useMutation } from "@apollo/client";

interface EditFormProps {
  toggleForm: () => void;
  originalText: string;
  noteId: string;
}

const EditForm: FunctionComponent<EditFormProps> = (props) => {
  const { noteId, originalText, toggleForm } = props;
  const [text, setText] = useState<string>(props.originalText);
  const [updateNote] = useMutation(updateNoteMutation);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    updateNote({ variables: { id: noteId, text: text } }).then((response) => {
      toggleForm();
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
            htmlFor={`note_${noteId}_text`}
            className="block font-bold mb-2"
          >
            Note
          </label>
          <textarea
            className="h-32 w-full border p-2 mb-2"
            id={`note_${noteId}_text`}
            defaultValue={originalText}
            onKeyDown={checkForSubmit}
            onChange={(e) => setText(e.target.value)}
          />
        </p>
        <input
          type="submit"
          className="btn btn-blue mb-2"
          value="Update Note"
        />
      </form>
    </div>
  );
};

export default EditForm;
