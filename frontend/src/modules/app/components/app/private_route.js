// @flow

import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'

import loadingWrapper from 'modules/loading_wrapper'

import gql from 'graphql-tag'

const currentUserQuery = gql`
  query currentUser {
    currentUser {
      email
    }
  }
`

type Props = {
  component: React.ComponentType<any>,
  location: {},
  data: {
    currentUser: {
      email: string
    }
  }
}

function PrivateRoute(props: Props) {
  const { component: Component, data: { currentUser }, ...rest } = props
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
