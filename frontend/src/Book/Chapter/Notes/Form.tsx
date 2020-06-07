import React, { FunctionComponent, useState } from "react";
import submitNoteMutation from "./SubmitNoteMutation";

import { useMutation } from "@apollo/react-hooks";

import { Note } from "../../Notes/types";

type FormProps = {
  bookPermalink: string;
  elementId: string;
  noteSubmitted: (note: Note) => void;
};

const Form: FunctionComponent<FormProps> = (props) => {
  const { elementId, bookPermalink, noteSubmitted } = props;
  const [text, setText] = useState<string>("");
  const [submitNote, { data }] = useMutation(submitNoteMutation);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitNote({
      variables: { bookPermalink, elementId, text: text },
      update: (store, { data }) => {
        noteSubmitted(data.submitNote);
      },
    });
  };

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const checkForSubmit = (e: any) => {
    if (e.metaKey && e.key == "Enter") {
      submit(e);
    }
  };

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
            onKeyDown={checkForSubmit}
            onChange={handleChange}
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
