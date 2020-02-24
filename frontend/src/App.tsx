import React, { Component } from "react";
import { Router, Link, Redirect } from "@reach/router";
import { ApolloProvider } from "react-apollo";

import ApolloClient from "./ApolloClient";

import CurrentUser from "./CurrentUser";
import CurrentUserContext from "./CurrentUser/context";
import OAuthCallback from "./OAuth/Callback";
import User from "./CurrentUser/user";
import Login from "./Login";
import Books from "./Books";
import Book from "./Book";
import Chapter from "./Book/Chapter";
import Notes from "./Book/Notes";
import Note from "./Book/Note";

import "./App.scss";

type UserInfoProps = {
  user: {
    email: string;
    githubLogin: string;
  };
};

function UserInfo(props: UserInfoProps) {
  return <span>Signed in as {props.user.githubLogin || props.user.email}</span>;
}

class Root extends Component<{}> {
  renderUserInfo() {
    return (
      <CurrentUserContext.Consumer>
        {user =>
          user ? <UserInfo user={user} /> : <Link to="#">Sign in</Link>
        }
      </CurrentUserContext.Consumer>
    );
  }

  renderAuthenticatedArea() {
    return (
      <Router>
        <OAuthCallback path="/oauth/callback" />
        <Chapter path="/books/:bookPermalink/chapters/:chapterPermalink" />
        <Note path="/books/:bookPermalink/notes/:number" />
        <Notes path="/books/:bookPermalink/notes" />
        <Book path="/books/:bookPermalink" />
        <Books path="/" />

        <Redirect from="/books" to="/" />
        {/* <PrivateRoute component={NotFound} /> */}
      </Router>
    );
  }

  renderLogin() {
    return (
      <Router>
        <Login path="/login" default />
        <OAuthCallback path="/oauth/callback" />
      </Router>
    );
  }

  renderAuthenticatedAreaOrRedirect = (user: User | null) => {
    if (user) {
      return this.renderAuthenticatedArea();
    } else {
      return this.renderLogin();
    }
  };

  render() {
    return (
      <ApolloProvider client={ApolloClient}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <menu>
                <Link to="/">
                  <strong>Twist</strong>
                </Link>{" "}
                &nbsp; | &nbsp;
                <CurrentUser>{this.renderUserInfo()}</CurrentUser>
              </menu>
            </div>
          </div>
          <CurrentUser>
            <CurrentUserContext.Consumer>
              {user => {
                return this.renderAuthenticatedAreaOrRedirect(user);
              }}
            </CurrentUserContext.Consumer>
          </CurrentUser>
        </div>
      </ApolloProvider>
    );
  }
}

export default Root;
