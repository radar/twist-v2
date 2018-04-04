import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import loadingWrapper from 'loading_wrapper'

import gql from 'graphql-tag'

const currentUserQuery = gql`
  query currentUser {
    currentUser {
      email
    }
  }
`

function PrivateRoute ({ component: Component, data: { currentUser }, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default graphql(currentUserQuery)(loadingWrapper(PrivateRoute))
