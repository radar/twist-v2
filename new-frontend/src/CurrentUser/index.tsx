import * as React from 'react'
import { Query } from 'react-apollo'

import currentUserQuery from './query'
import { User } from './user'
import CurrentUserContext from './context'

type CurrentUserProps = {
  children: React.ReactNode,
}

export default class CurrentUser extends React.Component<CurrentUserProps> {
  render() {
    return (
      <Query query={currentUserQuery}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <CurrentUserContext.Provider value={data}>
              {this.props.children}
            </CurrentUserContext.Provider>
          )
        }}
      </Query>
    )
  }
}
