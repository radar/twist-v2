import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './modules/app/components/app';
import apolloClient from "./modules/app/client";
import { ApolloProvider } from 'react-apollo';

import './App.css';

class Root extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <App></App>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default Root;
