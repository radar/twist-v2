import React, { Component } from 'react';
import Error from 'error';

export default function errorWrapper(WrappedComponent) {
  return class extends Component {
    render() {
      const {data: {error}} = this.props;

      if (error) return <Error error={error.message} />;

      return <WrappedComponent {...this.props} />;
    }
  };
}

