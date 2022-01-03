import * as React from "react";
import API from "../api";

import { RouteComponentProps } from "@reach/router";

interface LoginProps extends RouteComponentProps { }

type LoginState = {
  email: string;
  password: string;
  failed: boolean;
  error: string;
  githubAuthorizeUrl: string;
};

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    email: "",
    password: "",
    failed: false,
    error: "",
    githubAuthorizeUrl: "",
  };

  componentDidMount() {
    const api = new API();
    api.authorizationURL(({ data: { github_authorize_url } }) => {
      this.setState({ githubAuthorizeUrl: github_authorize_url });
    });
  }

  renderError() {
    if (this.state.failed) {
      return <span className="error">{this.state.error}</span>;
    }
  }

  render() {
    return (
      <div className="flex">
        <div className="w-1/4 mr-10">
          <h1>Login</h1>
          <div>
            <button
              className="btn btn-blue"
              onClick={() => {
                window.location.href = this.state.githubAuthorizeUrl;
              }}
            >
              Sign in with GitHub
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
