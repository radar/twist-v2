import React, { FunctionComponent, useState } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import moment from "moment";

import QueryWrapper from "../../QueryWrapper";
import {
  BranchQuery,
  useBranchQuery,
  useUpdateBranchMutation,
} from "../../graphql/types";
import PermissionDenied from "../../PermissionDenied";
import { gql } from "@apollo/client";

type Book = Extract<BranchQuery["book"], { __typename?: "Book" }>;
type BranchData = Book["branch"];
type CommitData = BranchData["commits"][0] & {
  bookPermalink: string;
};

interface BranchProps extends BranchData {
  bookTitle: string;
  bookPermalink: string;
}

gql`
  mutation UpdateBranch($bookPermalink: String!, $branchName: String!) {
    updateBranch(bookPermalink: $bookPermalink, branchName: $branchName) {
      name
    }
  }
`;

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
      <Link to={`/books/${bookPermalink}/tree/${sha}`}>
        <code>{sha.slice(0, 8)}</code> {dots}
        {moment(createdAt).fromNow()}
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
        <Link to={`/books/${bookPermalink}`}>{bookTitle}</Link> - {name} branch
      </h1>
      <Link to={`/books/${bookPermalink}/tree/${name}`}>
        Go to latest revision
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

type WrappedBranchProps = RouteComponentProps<{
  bookPermalink: string;
  name: string;
}>;

const WrappedBranch: FunctionComponent<WrappedBranchProps> = (props) => {
  const { bookPermalink, name } = props;

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
        bookPermalink={bookPermalink!}
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
