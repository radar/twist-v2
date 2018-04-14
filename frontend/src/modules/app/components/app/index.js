// @flow
import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './private_route'
import { WrappedBooks as Books } from 'modules/app/components/books'
import Book from 'modules/app/components/book'
import Chapter from 'modules/app/components/book/chapter'
import BookNotes from 'modules/app/components/book/notes'
import Login from 'modules/app/components/login'
import CurrentUser from 'modules/current_user'

type Props = {}

export function App(props: Props) {
  return (
    <CurrentUser>
      <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Books} />
          <PrivateRoute exact path="/books/:permalink" component={Book} />
          <PrivateRoute exact path="/books/:permalink/notes" component={BookNotes} />
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

function NotFound() {
  return <h5 style={{ margin: 40 }}>Route not found</h5>
}
