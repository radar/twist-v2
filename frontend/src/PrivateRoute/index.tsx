import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

import CurrentUserContext from '../Users/CurrentUser/Context'

type Props = {
  component: React.ComponentType<any>,
  path: string,
}

class PrivateRoute extends React.Component<Props> {
  renderOrRedirect(Component: React.ComponentType<any>, props: {}) {
    return (
      <CurrentUserContext.Consumer>
        {user =>
          user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: '/' }
              }}
            />
          )
        }
      </CurrentUserContext.Consumer>
    )
  }

  render() {
    const { component: Component, ...rest } = this.props
    return <Route {...rest} render={props => this.renderOrRedirect(Component, props)} />
  }
}

export default PrivateRoute
