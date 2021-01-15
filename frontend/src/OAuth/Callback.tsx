import React from "react";
import { Link, RouteComponentProps } from "@reach/router";
import queryString from "query-string";
import { AxiosResponse } from "axios";

import API from "../api";

type OAuthCallbackState = {
  error: string;
  errorDescription: string;
};

export default class OAuthCallback extends React.Component<
  RouteComponentProps,
  OAuthCallbackState
> {
  state = {
    error: "",
    errorDescription: "",
  };

  componentDidMount() {
    const api = new API();
    if (this.props.location) {
      const { code, state } = queryString.parse(this.props.location.search);
      const onSuccess = (response: AxiosResponse) => {
        window.localStorage.setItem("auth-token", response.data.jwt_token);
        window.location.href = "/";
      };

      const onFailure = ({ response: { data } }: any) => {
        this.setState({
          error: data.error,
          errorDescription: data.error_description,
        });
      };
      api.finishOAuth(code as string, state as string, onSuccess, onFailure);
    }
  }

  renderError() {
    const { error, errorDescription } = this.state;

    if (error) {
      return (
        <div>
          <h3>Authentication failed: {this.state.error}</h3>
          <p>{errorDescription}</p>

          <p>
            Go back to <Link to="/login">the login page</Link> and try again.
          </p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        Authenticating with GitHub... please wait.
        {this.renderError()}
      </div>
    );
  }
}
