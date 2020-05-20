import React, { FunctionComponent } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import moment from "moment";

import QueryWrapper from "../../QueryWrapper";
import branchQuery from "./branchQuery";

interface CommitType {
  sha: string;
  createdAt: string;
  message: string;
}

interface BranchType {
  name: string;
  default: boolean;
  commits: CommitType[];
}

interface BranchProps extends BranchType {
  bookTitle: string;
  bookPermalink: string;
}

interface CommitProps extends CommitType {
  bookPermalink: string;
}

const Commit: FunctionComponent<CommitProps> = (props) => {
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
  const { bookPermalink, bookTitle, name, commits } = props;

  const renderCommits = () => {
    return commits
      .slice(0, 50)
      .map((commit) => (
        <Commit bookPermalink={bookPermalink} key={commit.sha} {...commit} />
      ));
  };

  return (
    <div className={`bg-white p-4 border-gray-400 border rounded md:w-1/2`}>
      <h1>
        <Link to={`/books/${bookPermalink}`}>{bookTitle}</Link> - {name} branch
      </h1>
      <Link to={`/books/${bookPermalink}/tree/${name}`}>
        Go to latest revision
      </Link>
      <hr className="my-4" />
      <h2>Recent commits</h2>
      <ul className="list-inside list-disc">{renderCommits()}</ul>
    </div>
  );
};

type WrappedBranchProps = RouteComponentProps<{
  bookPermalink: string;
  name: string;
}>;

interface BranchesQueryData {
  book: {
    branch: BranchType;
    title: string;
  };
}

const WrappedBranch: FunctionComponent<WrappedBranchProps> = (props) => {
  const { bookPermalink, name } = props;

  return (
    <QueryWrapper query={branchQuery} variables={{ bookPermalink, name }}>
      {(data: BranchesQueryData) => {
        const {
          book: { title, branch },
        } = data;

        return (
          <Branch
            bookTitle={title}
            bookPermalink={bookPermalink!}
            {...branch}
          />
        );
      }}
    </QueryWrapper>
  );
};

export default WrappedBranch;
