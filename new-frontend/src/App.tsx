import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import PrivateRoute from './PrivateRoute'
import ApolloClient from './ApolloClient'

import CurrentUser from './CurrentUser'
import CurrentUserContext from './CurrentUser/Context'
import Login from './Login'
import Books from './Books'
import Book from './Book'
import Chapter from './Book/Chapter'
import Notes from './Book/Notes'
import Note from './Book/Note'

import './App.scss'

type UserInfoProps = {
  user: {
    email: string
  }
}

function UserInfo(props: UserInfoProps) {
  return (
    <span>Signed in as {props.user.email}</span>
  )
}

class Root extends Component<{}> {
  renderUserInfo() {
    return (
      <CurrentUserContext.Consumer>
        {user => (user ? <UserInfo user={user} /> : <Link to="#">Sign in</Link>)}
      </CurrentUserContext.Consumer>
    )
  }

  render() {
    return (
      <ApolloProvider client={ApolloClient}>
        <CurrentUser>
          <BrowserRouter>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <menu>
                    <Link to="/">
                      <strong>Twist</strong>
                    </Link>{' '}
                    &nbsp; | &nbsp;
                    {this.renderUserInfo()}
                  </menu>
                </div>
              </div>
              <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute
                  path="/books/:bookPermalink/chapters/:chapterPermalink"
                  component={Chapter}
                />
                <PrivateRoute path="/books/:bookPermalink/notes/:id" component={Note} />
                <PrivateRoute path="/books/:bookPermalink/notes" component={Notes} />
                <PrivateRoute path="/books/:bookPermalink" component={Book} />
                <PrivateRoute path="/" component={Books} />

                <Redirect from="/books" to="/" />
                {/* <PrivateRoute component={NotFound} /> */}
              </Switch>
            </div>
          </BrowserRouter>
        </CurrentUser>
      </ApolloProvider>
    )
  }
}

export default Root
