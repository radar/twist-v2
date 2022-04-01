import React from "react";
import InviteForm from "components/invitations/InviteForm";
import Readers from "components/invitations/Readers";
import QueryWrapper from "components/QueryWrapper";
import {
  BookCurrentUserAuthorQuery,
  useBookCurrentUserAuthorQuery,
} from "graphql/types";
import PermissionDenied from "components/PermissionDenied";
import { useRouter } from "next/router";
import Link from "next/link";

type InvitationsProps = {
  bookPermalink: string;
};

const Invitations: React.FC<InvitationsProps> = ({ bookPermalink }) => {
  return (
    <div className="flex gap-4">
      <InviteForm bookPermalink={bookPermalink as string} />
      <Readers bookPermalink={bookPermalink as string} />
    </div>
  );
};

const WrappedInvitations = () => {
  const router = useRouter();
  const { bookPermalink } = router.query;
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
            You must be the book&apos;s author to see this page. Nice try,
            though.
          </p>
          <Link href="/">
            <a>Go back.</a>
          </Link>
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

WrappedInvitations.auth = true;
