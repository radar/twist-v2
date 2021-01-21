import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { OptionTypeBase, ValueType } from "react-select";
import {
  BookIdTitleAndReadersQuery,
  useBookIdTitleAndReadersQuery,
  useInviteUserMutation,
  useUsersLazyQuery,
} from "../../graphql/types";
import PermissionDenied from "../../PermissionDenied";
import QueryWrapper from "../../QueryWrapper";
import { gql } from "@apollo/client";
import { Link } from "@reach/router";

gql`
  query bookIDTitleAndReaders($permalink: String!) {
    book(permalink: $permalink) {
      ... on PermissionDenied {
        error
      }

      ... on Book {
        id
        title

        readers {
          githubLogin
          name
        }
      }
    }
  }
`;

gql`
  query users($githubLogin: String!) {
    users(githubLogin: $githubLogin) {
      id
      githubLogin
      name
    }
  }
`;

gql`
  mutation inviteUser($bookId: ID!, $userId: ID!) {
    inviteUser(bookId: $bookId, userId: $userId) {
      bookId
      userId
    }
  }
`;

type Book = Extract<BookIdTitleAndReadersQuery["book"], { __typename: "Book" }>;
type Readers = Book["readers"];

type InviteFormProps = {
  bookPermalink: string;
  bookId: string;
  bookTitle: string;
  bookReaders: Readers;
};

type Selection = ValueType<OptionTypeBase, false>;

const InviteForm: React.FC<InviteFormProps> = ({
  bookPermalink,
  bookTitle,
  bookId,
  bookReaders,
}) => {
  const [userID, setUserID] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [usersQuery, { data }] = useUsersLazyQuery();

  const [inviteUserMutation] = useInviteUserMutation({ errorPolicy: "all" });

  const loadOptions = async (githubLogin: string, callback: Function) => {
    await usersQuery({ variables: { githubLogin } });

    if (data) {
      const readerLogins = bookReaders.map((reader) => reader.githubLogin);
      const uninvitedUsers = data.users.filter(
        (user) => !readerLogins.includes(user.githubLogin)
      );
      callback(
        uninvitedUsers.map((user) => {
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

  const inviteUser = () => {
    if (!userID) {
      return;
    }
    inviteUserMutation({ variables: { userId: userID, bookId: bookId } }).then(
      (response) => {
        setMessage("Invite sent!");
      }
    );
  };

  return (
    <>
      <Link to={`/books/${bookPermalink}`}>
        <h1>{bookTitle}</h1>
      </Link>
      <h2>Invite a reader</h2>

      <AsyncSelect
        loadOptions={loadOptions}
        onChange={selectUser}
        noOptionsMessage={({ inputValue }) =>
          `Could not find '${inputValue}' -- have they already been invited?`
        }
      />

      <button
        type="button"
        className="btn btn-blue mt-2"
        onClick={inviteUser}
        disabled={!userID}
      >
        Invite
      </button>
      <span className="ml-2 text-green-600">{message}</span>
    </>
  );
};

type WrappedInviteProps = {
  bookPermalink: string;
};

const WrappedInviteForm: React.FC<WrappedInviteProps> = ({ bookPermalink }) => {
  const { data, loading, error } = useBookIdTitleAndReadersQuery({
    variables: {
      permalink: bookPermalink as string,
    },
  });

  const renderInviteOrPermissionDenied = (data: BookIdTitleAndReadersQuery) => {
    if (data.book.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    return (
      <InviteForm
        bookPermalink={bookPermalink}
        bookId={data.book.id}
        bookTitle={data.book.title}
        bookReaders={data.book.readers}
      />
    );
  };

  return (
    <div className="main md:w-1/2">
      <QueryWrapper loading={loading} error={error}>
        {data && renderInviteOrPermissionDenied(data)}
      </QueryWrapper>
    </div>
  );
};

export default WrappedInviteForm;
