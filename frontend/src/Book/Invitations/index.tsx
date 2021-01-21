import React from "react";
import { Link, RouteComponentProps } from "@reach/router";
import InviteForm from "./InviteForm";
import Readers from "./Readers";
import { gql } from "@apollo/client";
import QueryWrapper from "../../QueryWrapper";
import {
  BookCurrentUserAuthorQuery,
  useBookCurrentUserAuthorQuery,
} from "../../graphql/types";
import PermissionDenied from "../../PermissionDenied";

type InvitationsProps = {
  bookPermalink: string;
};

gql`
  query bookCurrentUserAuthor($permalink: String!) {
    book(permalink: $permalink) {
      ... on PermissionDenied {
        error
      }

      ... on Book {
        currentUserAuthor
      }
    }
  }
`;

const Invitations: React.FC<InvitationsProps> = ({ bookPermalink }) => {
  return (
    <div className="flex gap-4">
      <InviteForm bookPermalink={bookPermalink as string} />
      <Readers bookPermalink={bookPermalink as string} />
    </div>
  );
};

const WrappedInvitations: React.FC<RouteComponentProps<InvitationsProps>> = ({
  bookPermalink,
}) => {
  const { data, loading, error } = useBookCurrentUserAuthorQuery({
    variables: { permalink: bookPermalink as string },
  });

  const renderInvitations = (data: BookCurrentUserAuthorQuery) => {
    if (data.book.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    if (!data.book.currentUserAuthor) {
      return (
        <PermissionDenied>
          <p>
            You must be the book's author to see this page. Nice try, though.
          </p>
          <Link to="/">Go back.</Link>
        </PermissionDenied>
      );
    }

    return <Invitations bookPermalink={bookPermalink as string} />;
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderInvitations(data)}
    </QueryWrapper>
  );
};

export default WrappedInvitations;
