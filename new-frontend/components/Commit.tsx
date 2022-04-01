import React from "react";
import Link from "next/link";
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

function Commit({
  permalink,
  commit: { sha, createdAt, branch },
  latestCommit,
}: CommitProps) {
  let latest;
  if (sha !== latestCommit.sha) {
    latest = <Link href={`/books/${permalink}`}> Go to latest revision </Link>;
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

export default Commit;
