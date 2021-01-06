import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

if (process.env.NODE_ENV !== "development") {
  Bugsnag.start({
    apiKey: "5904ec6fda1f66e31d52ebabca2e4fcb",
    plugins: [new BugsnagPluginReact(React)],
  });

  const ErrorBoundary = Bugsnag.getPlugin("react");

  ReactDOM.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(<App />, document.getElementById("root"));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
