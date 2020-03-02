import * as React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { DataProxy } from "apollo-cache";

import loginMutation from "./LoginMutation";
import CurrentUserQuery from "../CurrentUser/query";
import * as styles from "./Login.module.scss";
import API from "../api";

import githubLogo from "./github.png";

import { RouteComponentProps } from "@reach/router";

interface SuccessfulLoginData {
  __typename: string;
  email: string;
  token: string;
}

interface FailedLoginData {
  __typename: string;
  error: string;
}

type LoginData = SuccessfulLoginData | FailedLoginData;

interface LoginMutationData {
  login: LoginData;
}

class LoginMutation extends Mutation<LoginMutationData, {}> {}

interface LoginProps extends RouteComponentProps {}

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
    githubAuthorizeUrl: ""
  };

  componentDidMount() {
    const api = new API();
    api.authorizationURL(({ data: { github_authorize_url } }) => {
      this.setState({ githubAuthorizeUrl: github_authorize_url });
    });
  }

  handleSuccessfulLogin(store: DataProxy, login: SuccessfulLoginData) {
    const currentUserData = {
      currentUser: {
        __typename: "LoginResult",
        email: login.email
      }
    };

    store.writeQuery({ query: CurrentUserQuery, data: currentUserData });

    window.localStorage.setItem("auth-token", login.token);
  }

  handleFailedLogin(login: FailedLoginData) {
    this.setState({ failed: true, error: login.error });
  }

  handleLoginResult = (
    store: DataProxy,
    data: LoginMutationData | undefined
  ) => {
    if (data) {
      if ((data.login as FailedLoginData).error) {
        this.handleFailedLogin(data.login as FailedLoginData);
      } else {
        this.handleSuccessfulLogin(store, data.login as SuccessfulLoginData);
      }
    }
  };

  submit(loginMutation: MutationFn<LoginMutationData>) {
    this.setState({ failed: false });
    const { email, password } = this.state;
    loginMutation({
      variables: { email, password },
      update: (store, data) => {
        this.handleLoginResult(store, data.data);
      }
    });
  }

  renderError() {
    if (this.state.failed) {
      return <span className={styles.error}>{this.state.error}</span>;
    }
  }

  render() {
    return (
      <LoginMutation mutation={loginMutation}>
        {(login, { data }) => (
          <div className="main flex md:w-1/2">
            <div className="w-1/4 mr-10">
              <h1>Login</h1>
              <div className={`${styles.oauth} w-56`}>
                <button
                  onClick={() => {
                    window.location.href = this.state.githubAuthorizeUrl;
                  }}
                >
                  <img src={githubLogo} className="float-left" />

                  <span>Sign in with GitHub</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </LoginMutation>
    );
  }
}

export default Login;
