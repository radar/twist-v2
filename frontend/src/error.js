import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <div className="error">
        {this.props.error}
      </div>
    );
  }
}

export default Error;

