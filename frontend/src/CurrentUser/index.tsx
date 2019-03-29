import * as React from 'react'
import { Query } from 'react-apollo'

import QueryWrapper from '../QueryWrapper'
import currentUserQuery from './Query'
import { User } from './User'
import CurrentUserContext from './Context'

type CurrentUserProps = {
  children: React.ReactNode,
}

export default class CurrentUser extends React.Component<CurrentUserProps> {
  render() {
    return (
      <QueryWrapper query={currentUserQuery}>
        {(data) => {
          return (
            <CurrentUserContext.Provider value={data.currentUser}>
              {this.props.children}
            </CurrentUserContext.Provider>
          )
        }}
      </QueryWrapper>
    )
  }
}
