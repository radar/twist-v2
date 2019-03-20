import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import PrivateRoute from './PrivateRoute'
import ApolloClient from './ApolloClient'

import CurrentUser from './CurrentUser'
import Login from './Login'
import Books from './Books'

import './App.css'

class Root extends Component<{}> {
  render() {
    return (
      <ApolloProvider client={ApolloClient}>
        <CurrentUser>
          <BrowserRouter>
            <menu>
              <Link to="/">
                <strong>Twist</strong>
              </Link>{' '}
              &nbsp; | &nbsp;
              {/* {this.renderUserInfo()} */}
            </menu>

            <div className="container">
              <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/" component={Books} />
                {/* <PrivateRoute exact path="/books/:permalink" component={Book} />
                <PrivateRoute exact path="/books/:permalink/notes" component={BookNotes} />
                <PrivateRoute exact path="/books/:permalink/notes/:id" component={BookNote} />
                <PrivateRoute
                  exact
                  path="/books/:bookPermalink/chapters/:chapterPermalink"
                  component={Chapter}
                />
                <Redirect from="/books" to="/" />
                <PrivateRoute component={NotFound} /> */}
              </Switch>
            </div>
          </BrowserRouter>
        </CurrentUser>
      </ApolloProvider>
    )
  }
}

export default Root
