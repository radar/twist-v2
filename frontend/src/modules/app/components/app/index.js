import React from "react";
import { Route, Switch } from "react-router-dom";
import Books from "../books";

export function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={Books} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function NotFound() {
  return (
    <h5 style={{ margin: 40 }}>
      Route not found
    </h5>
  );
}
