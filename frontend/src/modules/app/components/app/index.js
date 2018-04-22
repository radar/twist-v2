// @flow
import * as React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

import PrivateRoute from './private_route'
import { WrappedBooks as Books } from 'modules/app/components/books'
import Book from 'modules/app/components/book'
import Chapter from 'modules/app/components/book/chapter'
import BookNotes from 'modules/app/components/book/notes'
import BookNote from 'modules/app/components/book/note'
import Login from 'modules/app/components/login'
import CurrentUser from 'modules/current_user'
import CurrentUserContext from 'modules/current_user_context'

type UserInfoProps = {
  user: {
    email: string
  }
}

function UserInfo(props: UserInfoProps) {
  return <span>Signed in as {props.user.email}</span>
}

type Props = {}

export class App extends React.Component<Props> {
  renderUserInfo() {
    return (
      <CurrentUserContext.Consumer>
        {user => (user ? <UserInfo user={user} /> : <Link to="#">Sign in</Link>)}
      </CurrentUserContext.Consumer>
    )
  }

  render() {
    return (
      <CurrentUser>
        <menu>
          <Link to="/">
            <strong>Twist</strong>
          </Link>{' '}
          &nbsp; | &nbsp;
          {this.renderUserInfo()}
        </menu>

        <div className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Books} />
            <PrivateRoute exact path="/books/:permalink" component={Book} />
            <PrivateRoute exact path="/books/:permalink/notes" component={BookNotes} />
            <PrivateRoute exact path="/books/:permalink/notes/:id" component={BookNote} />
            <PrivateRoute
              exact
              path="/books/:bookPermalink/chapters/:chapterPermalink"
              component={Chapter}
            />
            <Redirect from="/books" to="/" />
            <PrivateRoute component={NotFound} />
          </Switch>
        </div>
      </CurrentUser>
    )
  }
}

function NotFound() {
  return <h5 style={{ margin: 40 }}>Route not found</h5>
}
