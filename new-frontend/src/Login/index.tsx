// @flow

import * as React from 'react'
import { Mutation, MutationFn, FetchResult } from 'react-apollo'
import { DataProxy } from 'apollo-cache'

import loginMutation from './LoginMutation'
import CurrentUserQuery from '../CurrentUser/query'

type LoginProps = {
  history: {
    push: Function
  }
}

type LoginState = {
  email: string,
  password: string
}

interface LoginMutationData {
  login: {
    email: string,
    token: string,
    error: string
  }
}

class LoginMutation extends Mutation<LoginMutationData, {}> {}


class Login extends React.Component<LoginProps, LoginState> {
  state = {
    email: '',
    password: ''
  }

  handleLoginResult = (
    store: DataProxy,
    data: FetchResult<LoginMutationData>,
  ) => {
    if (data.data) {
      const currentUserData = {
        currentUser: {
          __typename: 'LoginResult',
          email: data.data.login
        }
      }
      store.writeQuery({ query: CurrentUserQuery, data: currentUserData })

      this.props.history.push("/")
    }
  }

  submit(loginMutation: MutationFn<LoginMutationData>) {
    const {email, password} = this.state
    loginMutation({
      variables: { email, password },
      update: (store, data) => { this.handleLoginResult(store, data)}
    })
  }

  render() {
    return (
      <Mutation mutation={loginMutation}>
        {(login, { data }) => (
          <div className="row">
            <div className="main col-md-7">
              <div className="col-md-6">
                <h1>Login</h1>
                <form
                  // class methods are preferred for neatness and testing purposes e.g. handleSubmit =
                  onSubmit={e => {
                    e.preventDefault()
                    this.submit(login)
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={this.state.password}
                      onChange={e => this.setState({ password: e.target.value })}
                    />
                  </div>
                  <input type="submit" className="btn btn-primary" value="Login" />
                </form>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    )
  }
}

export default Login
