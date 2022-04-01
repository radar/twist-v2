import React, { FunctionComponent, useState } from "react";
import Link from "next/link";
import moment from "moment";

import QueryWrapper from "components/QueryWrapper";
import {
  BranchQuery,
  useBranchQuery,
  useUpdateBranchMutation,
} from "graphql/types";
import PermissionDenied from "components/PermissionDenied";
import { useRouter } from "next/router";

type Book = Extract<BranchQuery["book"], { __typename?: "Book" }>;
type BranchData = Book["branch"];
type CommitData = BranchData["commits"][0] & {
  bookPermalink: string;
};

interface BranchProps extends BranchData {
  bookTitle: string;
  bookPermalink: string;
}

const Commit: FunctionComponent<CommitData> = (props) => {
  const { bookPermalink, sha, createdAt, message } = props;
  let dots;
  if (message) {
    dots = <span>&middot; {message} &middot; </span>;
  } else {
    dots = <span>&middot; </span>;
  }
  return (
    <li>
      <Link href={`/books/${bookPermalink}/tree/${sha}`}>
        <a>
          <code>{sha.slice(0, 8)}</code> {dots}
          {moment(createdAt).fromNow()}
        </a>
      </Link>
    </li>
  );
};

const Branch: FunctionComponent<BranchProps> = (props) => {
  const [updateBranch] = useUpdateBranchMutation({ errorPolicy: "all" });
  const { bookPermalink, bookTitle, name, commits } = props;

  const [message, setMessage] = useState<string>("");

  const update = () => {
    updateBranch({
      variables: { bookPermalink, branchName: name },
    }).then((response) =>
      setMessage(
        "Branch is being updated. Refresh this page in a few seconds to see latest commit."
      )
    );
  };

  const renderCommits = () => {
    return commits
      .slice(0, 50)
      .map((commit) => (
        <Commit bookPermalink={bookPermalink} key={commit.sha} {...commit} />
      ));
  };

  return (
    <div>
      <h1>
        <Link href={`/books/${bookPermalink}`}>
          <a>{bookTitle}</a>
        </Link>{" "}
        - {name} branch
      </h1>
      <Link href={`/books/${bookPermalink}/tree/${name}`}>
        <a>Go to latest revision</a>
      </Link>{" "}
      <hr className="my-4" />
      <button type="button" className="btn btn-green" onClick={update}>
        Update branch
      </button>
      <div className="ml-2 text-green-600">{message}</div>
      <h2>Recent commits</h2>
      <ul className="list-inside list-disc">{renderCommits()}</ul>
    </div>
  );
};

const WrappedBranch = () => {
  const router = useRouter();
  const { bookPermalink, name } = router.query;

  const { data, loading, error } = useBranchQuery({
    variables: { bookPermalink: bookPermalink as string, name: name as string },
  });

  const renderBranches = (data: BranchQuery) => {
    const { book } = data;

    if (book.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    return (
      <Branch
        bookTitle={book.title}
        bookPermalink={bookPermalink as string}
        {...book.branch}
      />
    );
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderBranches(data)}
    </QueryWrapper>
  );
};

export default WrappedBranch;
WrappedBranch.auth = true;
