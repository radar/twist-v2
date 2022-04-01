import React, { FunctionComponent } from "react";
import Link from "next/link";
import QueryWrapper from "components/QueryWrapper";
import { BranchesQuery, useBranchesQuery } from "graphql/types";
import { useRouter } from "next/router";

type BranchesQueryBook = Extract<
  BranchesQuery["book"],
  { __typename?: "Book" }
>;

interface BranchesProps {
  bookTitle: string;
  bookPermalink: string;
  branches: BranchesQueryBook["branches"];
}

type Branch = BranchesQueryBook["branches"][0];

type BranchItemProps = Branch & {
  bookPermalink: string;
};

const BranchItem = (props: BranchItemProps) => {
  let name;
  if (props.default) {
    name = <strong>{props.name} (Default)</strong>;
  } else {
    name = <span>{props.name}</span>;
  }
  return (
    <li>
      <Link href={`/books/${props.bookPermalink}/branches/${props.name}`}>
        <a>{name}</a>
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
    <div>
      <h1>
        <Link href={`/books/${bookPermalink}`}>
          <a>{bookTitle}</a>
        </Link>{" "}
        - Branches
      </h1>
      <ul className="list-inside list-disc">{renderBranches()}</ul>
    </div>
  );
};

const WrappedBranches = () => {
  const router = useRouter();
  const { bookPermalink } = router.query;
  const { data, loading, error } = useBranchesQuery({
    variables: { bookPermalink: bookPermalink as string },
  });

  const renderBranches = (data: BranchesQuery) => {
    const { book } = data;

    if (book.__typename === "Book") {
      return (
        <Branches
          bookTitle={book.title}
          bookPermalink={bookPermalink as string}
          branches={book.branches}
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

WrappedBranches.auth = true;
