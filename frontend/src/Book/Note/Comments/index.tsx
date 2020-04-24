import * as React from "react";

import QueryWrapper from "../../../QueryWrapper";
import commentsQuery from "./CommentsQuery";
import CommentForm from "./CommentForm";
import { Comment as CommentType } from "../../Notes/types";
import Comment from "./Comment";

type CommentsProps = {
  noteId: string;
  comments: CommentType[];
};

type CommentsState = {
  comments: CommentType[];
};

class Comments extends React.Component<CommentsProps, CommentsState> {
  state = { comments: this.props.comments };

  renderComments() {
    return this.state.comments.map((comment) => (
      <Comment {...comment} key={comment.id} />
    ));
  }

  updateComments = (comments: CommentType[]) => {
    this.setState({ comments: comments });
  };

  render() {
    return (
      <div className="mt-4">
        {this.renderComments()}
        <CommentForm
          noteId={this.props.noteId}
          updateComments={this.updateComments}
        />
      </div>
    );
  }
}

type WrappedCommentsProps = {
  noteId: string;
};

export default class WrappedComments extends React.Component<
  WrappedCommentsProps
> {
  render() {
    const { noteId } = this.props;
    return (
      <QueryWrapper query={commentsQuery} variables={{ noteId }}>
        {({ comments }) => <Comments noteId={noteId} comments={comments} />}
      </QueryWrapper>
    );
  }
}
