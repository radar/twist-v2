// @flow

import React, { Component } from 'react'

type ErrorProps = {
  error: string
}

class Error extends Component<ErrorProps> {
  render() {
    return <div className="error">{this.props.error}</div>
  }
}

export default Error
