// @flow

import * as React from 'react'
import { Mutation } from 'react-apollo'

import LoginMutation from './container'

type LoginProps = {
  history: {
    push: Function
  }
}

type LoginState = {
  email: string,
  password: string
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  async submit(login: Function) {
    const result = await login({
      variables: { email: this.state.email, password: this.state.password }
    })

    window.localStorage.setItem('auth-token', result.data.login)

    this.props.history.push(`/`)
  }

  render() {
    return (
      <Mutation mutation={LoginMutation}>
        {(login, { data }) => (
          <div className="row">
            <div className="main col-md-7">
              <div className="col-md-6">
                <h1>Login</h1>
                <form
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
