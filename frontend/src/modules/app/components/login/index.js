// @flow

import React, { Component } from 'react'
import { compose } from 'react-apollo'

import container from './container'

type LoginProps = {
  loginMutation: function,
  history: {
    push: function
  }
}

type LoginState = {
  email: string,
  password: string
}

class Login extends Component<LoginProps, LoginState> {
  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    return (
      <div className="row">
        <div className="main col-md-7">
          <div className="col-md-6">
            <h1>Login</h1>
            <form>
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
              <div className="btn btn-primary" onClick={() => this._confirm()}>
                Login
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  async _confirm() {
    const { email, password } = this.state
    const result = await this.props.loginMutation({
      variables: {
        email,
        password
      }
    })

    window.localStorage.setItem('auth-token', result.data.token)

    this.props.history.push(`/`)
  }
}

export default compose(container)(Login)
