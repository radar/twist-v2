import React from "react";
import { Link } from "@reach/router";
import moment from "moment";

interface CommitProps {
  permalink: string;
  commit: {
    sha: string;
    createdAt: string;
    branch: {
      name: string;
    };
  };
  latestCommit: {
    sha: string;
  };
}

class Commit extends React.Component<CommitProps> {
  render() {
    const {
      permalink,
      commit: { sha, createdAt, branch },
      latestCommit,
    } = this.props;
    let latest;
    if (sha != latestCommit.sha) {
      latest = <Link to={`/books/${permalink}`}> Go to latest revision </Link>;
    } else {
      latest = "Latest commit";
    }
    return (
      <div className="text-gray-600 mb-4">
        <small>
          {branch.name}@{sha.slice(0, 8)} &middot; {moment(createdAt).fromNow()}{" "}
          &middot; {latest}
        </small>
      </div>
    );
  }
}

export default Commit;
