import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

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

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.shape({

  }),
  data: PropTypes.shape({
    currentUser: PropTypes.shape({
      email: PropTypes.string
    })
  })
}

export default graphql(currentUserQuery)(loadingWrapper(PrivateRoute))
