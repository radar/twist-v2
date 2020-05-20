import React, { FunctionComponent } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import QueryWrapper from "../../QueryWrapper";
import branchesQuery from "./branchesQuery";

interface Branch {
  name: string;
  default: string;
}

interface BranchesProps {
  bookTitle: string;
  bookPermalink: string;
  branches: Branch[];
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

interface BranchesQueryData {
  book: {
    branches: Branch[];
    title: string;
  };
}

const WrappedBranches: FunctionComponent<WrappedBranchesProps> = (props) => {
  const { bookPermalink } = props;

  return (
    <QueryWrapper
      query={branchesQuery}
      variables={{ bookPermalink: bookPermalink }}
    >
      {(data: BranchesQueryData) => {
        const {
          book: { title, branches },
        } = data;

        return (
          <Branches
            bookTitle={title}
            bookPermalink={bookPermalink!}
            branches={branches}
          />
        );
      }}
    </QueryWrapper>
  );
};

export default WrappedBranches;
