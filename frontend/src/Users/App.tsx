import * as React from "react"
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import OAuthCallback from './OAuth/Callback'
import Login from './Login'

export default class extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/oauth/callback" component={OAuthCallback} />
          <Route path="/login" component={Login} />
          <Redirect from="/" to="/login" />
        </Switch>
      </BrowserRouter>
    )
  }
}
