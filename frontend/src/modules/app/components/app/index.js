import React from "react";
import { Route, Switch } from "react-router-dom";
import Books from "modules/app/components/books";
import Book from "modules/app/components/book";
import Chapter from "modules/app/components/book/chapter";

export function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={Books} />
        <Route exact path="/books/:permalink" component={Book} />
        <Route exact path="/books/:bookPermalink/chapters/:chapterPermalink" component={Chapter} />
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
