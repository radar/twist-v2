import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Switch, Redirect } from 'react-router-dom'

import ApolloClient from './ApolloClient'

import PrivateRoute from '../PrivateRoute'
import Books from './index'
import Book from './Book'
import Chapter from './Book/Chapter'
import Notes from './Book/Notes'
import Note from './Book/Note'

export default class extends React.Component {
  render() {
    return (
      <div>
        <ApolloProvider client={ApolloClient}>
          <div className="row">
            <Switch>
              <PrivateRoute
                path="/books/:bookPermalink/chapters/:chapterPermalink"
                component={Chapter}
              />
              <PrivateRoute path="/books/:bookPermalink/notes/:number" component={Note} />
              <PrivateRoute path="/books/:bookPermalink/notes" component={Notes} />
              <PrivateRoute path="/books/:bookPermalink" component={Book} />
              <PrivateRoute path="/" component={Books} />

              <Redirect from="/books" to="/" />
              {/* <PrivateRoute component={NotFound} /> */}
            </Switch>
          </div>
        </ApolloProvider>
    </div>
    )
  }
}
