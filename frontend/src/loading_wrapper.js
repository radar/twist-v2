import React, { Component } from 'react';
import Loading from 'loading';

export default function loadingWrapper(WrappedComponent) {
  return class extends Component {
    render() {
      const {data: {loading}} = this.props;

      if (loading) return <Loading />;

      return <WrappedComponent {...this.props} />;
    }
  };
}

