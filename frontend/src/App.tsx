import React, { Component } from "react";
import { Router, Link, Redirect } from "@reach/router";
import { ApolloProvider } from "@apollo/client";

import ApolloClient from "./ApolloClient";

import CurrentUserContext, { CurrentUserType } from "./CurrentUser/context";
import OAuthCallback from "./OAuth/Callback";
import Login from "./Login";
import Books from "./Books";
import Book from "./Book";
import Branches from "./Book/Branches";
import Branch from "./Book/Branches/Branch";
import Chapter from "./Book/Chapter";
import Invite from "./Book/Invitations";
import Notes from "./Book/Notes";
import Note from "./Book/Note";

import "./styles.css";
import CurrentUser from "./CurrentUser";

type User = Exclude<CurrentUserType, null | undefined>;

function UserInfo({ githubLogin, email }: User) {
  return <span>Signed in as {githubLogin || email}</span>;
}

const Root: React.FC = () => {
  const renderUserInfo = () => {
    return (
      <CurrentUserContext.Consumer>
        {(user: CurrentUserType) =>
          user ? <UserInfo {...user} /> : <Link to="#">Sign in</Link>
        }
      </CurrentUserContext.Consumer>
    );
  };

  const renderAuthenticatedArea = () => {
    return (
      <Router>
        <OAuthCallback path="/oauth/callback" />
        <Chapter path="/books/:bookPermalink/tree/:gitRef/chapters/:chapterPermalink" />
        <Chapter path="/books/:bookPermalink/chapters/:chapterPermalink" />
        <Note path="/books/:bookPermalink/notes/:number" />
        <Notes path="/books/:bookPermalink/notes" />
        <Book path="/books/:bookPermalink/tree/:gitRef" />
        <Book path="/books/:bookPermalink" />
        <Branches path="/books/:bookPermalink/branches" />
        <Branch path="/books/:bookPermalink/branches/:name" />

        <Books path="/" />
        <Invite path="/books/:bookPermalink/invite" />

        <Redirect from="/books" to="/" />
      </Router>
    );
  };

  const renderLogin = () => {
    return (
      <Router>
        <Login path="/login" default />
        <OAuthCallback path="/oauth/callback" />
      </Router>
    );
  };

  const renderAuthenticatedAreaOrRedirect = (user: CurrentUserType) => {
    if (user || process.env.REACT_APP_ALLOW_ANYONE) {
      return renderAuthenticatedArea();
    } else {
      return renderLogin();
    }
  };

  return (
    <ApolloProvider client={ApolloClient}>
      <div className="my-4 mx-auto px-4">
        <menu>
          <Link to="/">
            <strong>Twist</strong>
          </Link>{" "}
          &nbsp; | &nbsp;
          <CurrentUser>{renderUserInfo()}</CurrentUser>
        </menu>
        <CurrentUser>
          <CurrentUserContext.Consumer>
            {(user) => {
              return renderAuthenticatedAreaOrRedirect(user);
            }}
          </CurrentUserContext.Consumer>
        </CurrentUser>
      </div>
    </ApolloProvider>
  );
};

export default Root;
