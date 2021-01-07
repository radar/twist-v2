import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { OptionTypeBase, ValueType } from "react-select";
import {
  BookTitleQuery,
  useBookTitleQuery,
  useUsersLazyQuery,
} from "../../graphql/types";
import PermissionDenied from "../../PermissionDenied";
import QueryWrapper from "../../QueryWrapper";

type InviteProps = {
  bookTitle: string;
};

type Selection = ValueType<OptionTypeBase, false>;

const Invite: React.FC<InviteProps> = ({ bookTitle }) => {
  const [userID, setUserID] = useState<string>("");
  const [usersQuery, { data }] = useUsersLazyQuery();

  const loadOptions = async (githubLogin: string, callback: Function) => {
    await usersQuery({ variables: { githubLogin } });
    if (data) {
      callback(
        data.users.map((user) => {
          return {
            value: user.id,
            label: `${user.githubLogin} (${user.name})`,
          };
        })
      );
    }
  };

  const selectUser = (selection: Selection) => {
    if (!selection) return;

    setUserID(selection.value);
  };

  return (
    <div className={`bg-white p-4 border-gray-400 border rounded md:w-1/2`}>
      <h1>{bookTitle}</h1>
      <h2>Invite a user</h2>

      <AsyncSelect loadOptions={loadOptions} onChange={selectUser} />
      {userID}
    </div>
  );
};

type WrappedInviteProps = {
  bookPermalink: string;
};

const WrappedInvite: React.FC<RouteComponentProps<WrappedInviteProps>> = ({
  bookPermalink,
}) => {
  const { data, loading, error } = useBookTitleQuery({
    variables: {
      permalink: bookPermalink as string,
    },
  });

  const renderInviteOrPermissionDenied = (data: BookTitleQuery) => {
    if (data.book.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    return <Invite bookTitle={data.book.title}></Invite>;
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderInviteOrPermissionDenied(data)}
    </QueryWrapper>
  );
};

export default WrappedInvite;
