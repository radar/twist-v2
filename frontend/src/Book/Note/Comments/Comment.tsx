import * as React from "react";
import ReactMarkdown from "react-markdown";
import Gravatar from "react-gravatar";
import moment from "moment";

import { Comment as CommentProps } from "../../Notes/types";
import * as styles from "./Comment.module.scss";

export default class Comment extends React.Component<CommentProps> {
  render() {
    const { user, createdAt, text } = this.props;
    const time = moment(createdAt).fromNow();

    return (
      <div className={styles.comment}>
        <div className="flex">
          <div className={`${styles.avatar} w-34 p-4`}>
            <Gravatar email={user.email} />
          </div>

          <div className={`${styles.commentContainer} w-full`}>
            <div className={`${styles.commentHeader} px-4`}>
              {user.name} commented {time}
            </div>
            <div className="row">
              <div className={`${styles.commentBody}`}>
                <ReactMarkdown source={text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
