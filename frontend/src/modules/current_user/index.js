// @flow
import * as React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import loadingWrapper from 'modules/loading_wrapper'
import errorWrapper from 'modules/error_wrapper'
import CurrentUserContext from 'modules/current_user_context'

export const CurrentUserQuery = gql`
  query currentUser {
    currentUser {
      email
    }
  }
`

type User = {
  email: string
}

type CurrentUserProps = {
  data: {
    currentUser: ?User
  },
  children: React.Element<any>
}

class CurrentUser extends React.Component<CurrentUserProps> {
  render() {
    const { data: { currentUser } } = this.props
    return (
      <CurrentUserContext.Provider value={currentUser}>
        {this.props.children}
      </CurrentUserContext.Provider>
    )
  }
}

export default graphql(CurrentUserQuery)(errorWrapper(loadingWrapper(CurrentUser)))
