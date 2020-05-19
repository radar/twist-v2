import React, { FunctionComponent, useState } from "react";

import submitNoteMutation from "./SubmitNoteMutation";
import { useMutation } from "@apollo/react-hooks";

import { Note } from "../../Notes/types";

type FormProps = {
  bookPermalink: string;
  elementId: string;
  noteSubmitted: (note: Note) => void;
};

type FormState = {
  showThanks: boolean;
  text: string;
};

interface SubmitNoteMutationData {
  submitNote: Note;
}

const Form: FunctionComponent<FormProps> = (props) => {
  const [text, setText] = useState<string>("");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const { elementId } = props;
  return (
    <div>
      <form onSubmit={submit}>
        <p>
          <label
            htmlFor={`element_${elementId}_note`}
            className="block font-bold mb-2"
          >
            Leave a note (Markdown enabled)
          </label>
          <textarea
            className="w-full border p-2 mb-2"
            id={`element_${elementId}_note`}
            onChange={(e) => setText(e.target.value)}
          />
        </p>

        <input
          type="submit"
          className="btn btn-blue mb-2"
          value="Submit Note"
        />
      </form>
    </div>
  );
};

export default Form;
