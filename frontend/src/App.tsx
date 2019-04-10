import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import UsersApolloClient from './Users/ApolloClient'
import { User } from './Users/CurrentUser/User'
import CurrentUser from './Users/CurrentUser'

import CurrentUserContext from './Users/CurrentUser/Context'
import UsersApp from './Users/App'
import BooksApp from './Books/App'

import './App.scss'

type UserInfoProps = {
  user: {
    email: string,
    githubLogin: string,
  }
}

function UserInfo(props: UserInfoProps) {
  return (
    <span>Signed in as {props.user.githubLogin || props.user.email}</span>
  )
}

class Root extends Component<{}> {
  renderUserInfo() {
    return (
      <CurrentUserContext.Consumer>
        {user => (user ? <UserInfo user={user} /> : <Link to="#">Sign in</Link>)}
      </CurrentUserContext.Consumer>
    )
  }

  renderApp(user: User | null) {
    const Component = user ? BooksApp : UsersApp
    return (
      <Container user={user}>
        <Component />
      </Container>
    )
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <ApolloProvider client={UsersApolloClient}>
            <CurrentUser>
              <CurrentUserContext.Consumer>
                {this.renderApp}
              </CurrentUserContext.Consumer>
            </CurrentUser>
          </ApolloProvider>
        </BrowserRouter>
      </div>
    )
  }
}

type ContainerProps = {
  user: User | null;
}

class Container extends React.Component<ContainerProps> {
  renderUser() {
    const {user} = this.props
    if (user) {
      return <span>| Signed in as {user.email}</span>
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <menu>
              <Link to="/">
                <strong>Twist</strong>
              </Link>{' '}
              {this.renderUser()}
            </menu>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Root
