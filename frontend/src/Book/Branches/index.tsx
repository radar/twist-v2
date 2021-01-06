import React, { FunctionComponent } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import QueryWrapper from "../../QueryWrapper";
import { Branch, BranchesQuery, useBranchesQuery } from "../../graphql/types";

type BranchesData = ReadonlyArray<Branch>;

interface BranchesProps {
  bookTitle: string;
  bookPermalink: string;
  branches: BranchesData;
}

interface BranchItemProps extends Branch {
  bookPermalink: string;
}

const BranchItem: FunctionComponent<BranchItemProps> = (props) => {
  let name;
  if (props.default) {
    name = <strong>{props.name} (Default)</strong>;
  } else {
    name = <span>{props.name}</span>;
  }
  return (
    <li>
      <Link to={`/books/${props.bookPermalink}/branches/${props.name}`}>
        {name}
      </Link>
    </li>
  );
};

const Branches: FunctionComponent<BranchesProps> = (props) => {
  const { bookPermalink, bookTitle, branches } = props;

  const renderBranches = () => {
    return branches.map((branch) => (
      <BranchItem bookPermalink={bookPermalink} key={branch.name} {...branch} />
    ));
  };

  return (
    <div className={`bg-white p-4 border-gray-400 border rounded md:w-1/2`}>
      <h1>
        <Link to={`/books/${bookPermalink}`}>{bookTitle}</Link> - Branches
      </h1>
      <ul className="list-inside list-disc">{renderBranches()}</ul>
    </div>
  );
};

type WrappedBranchesProps = RouteComponentProps<{ bookPermalink: string }>;

const WrappedBranches: FunctionComponent<WrappedBranchesProps> = (props) => {
  const { bookPermalink } = props;

  const { data, loading, error } = useBranchesQuery({
    variables: { bookPermalink: bookPermalink as string },
  });

  const renderBranches = (data: BranchesQuery) => {
    const { book } = data;

    if (book.__typename === "Book") {
      return (
        <Branches
          bookTitle={book.title}
          bookPermalink={bookPermalink!}
          branches={book.branches as BranchesData}
        />
      );
    }
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderBranches(data)}
    </QueryWrapper>
  );
};

export default WrappedBranches;
