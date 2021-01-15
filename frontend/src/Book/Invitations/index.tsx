import React from "react";
import { RouteComponentProps } from "@reach/router";
import InviteForm from "./InviteForm";
import Readers from "./Readers";

type InvitationsProps = {
  bookPermalink: string;
};

const Invitations: React.FC<RouteComponentProps<InvitationsProps>> = ({
  bookPermalink,
}) => {
  return (
    <div className="flex gap-4">
      <InviteForm bookPermalink={bookPermalink as string} />
      <Readers bookPermalink={bookPermalink as string} />
    </div>
  );
};

export default Invitations;
