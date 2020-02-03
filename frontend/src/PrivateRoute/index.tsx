import * as React from "react";
import { Redirect } from "@reach/router";

import CurrentUserContext from "../CurrentUser/context";

type Props = {
  component: React.ComponentType<any>;
  path: string;
};

class PrivateRoute extends React.Component<Props> {
  renderOrRedirect(Component: React.ComponentType<any>, props: {}) {
    return (
      <CurrentUserContext.Consumer>
        {user => (user ? <Component {...props} /> : <Redirect to={"/login"} />)}
      </CurrentUserContext.Consumer>
    );
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return null;
    // return (
    //   <Compeone
    //     {...rest}
    //     render={props => this.renderOrRedirect(Component, props)}
    //   />
    // );
  }
}

export default PrivateRoute;
