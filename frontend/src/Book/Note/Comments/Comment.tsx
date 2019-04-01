import * as React from "react"
import ReactMarkdown from "react-markdown"
import Gravatar from "react-gravatar"
import moment from "moment"

import {User} from "../../Notes/types"
import * as styles from "./Comment.module.scss"

export type CommentProps = {
  id: string,
  createdAt: string,
  text: string,
  user: User
}

export default class Comment extends React.Component<CommentProps> {
  render() {
    const {user, createdAt, text} = this.props;
    const time = moment(createdAt).fromNow();

    return (
      <div className={styles.comment}>
        <div className="row">
          <div className={`${styles.avatar} col-md-1`}>
            <Gravatar email={user.email} />
          </div>

          <div className={`${styles.commentContainer} col-md-11`}>
            <div className="row">
              <div className={`${styles.commentHeader} col-md-12`}>
                {user.name} commented {time}
              </div>
            </div>
            <div className="row">
              <div className={`${styles.commentBody} col-md-12`}>
                <ReactMarkdown source={text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
