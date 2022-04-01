import React, { FunctionComponent, useState } from "react";

import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { Comment as CommentType, Note } from "../../../graphql/types";

type CommentsType = Note["comments"];

type CommentsProps = {
  noteId: string;
  comments: CommentsType;
};

const Comments: FunctionComponent<CommentsProps> = (props) => {
  const [comments, setComments] = useState<CommentsType>(props.comments);

  const renderComments = () => {
    return comments.map((comment) => <Comment {...comment} key={comment.id} />);
  };

  const addComment = (comment: CommentType) => {
    setComments(comments.concat(comment));
  };

  return (
    <div className="mt-4">
      {renderComments()}
      <CommentForm noteId={props.noteId} addComment={addComment} />
    </div>
  );
};

export default Comments;
