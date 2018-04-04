import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Error extends Component {
  render () {
    return (
      <div className="error">
        {this.props.error}
      </div>
    )
  }
}

Error.propTypes = {
  error: PropTypes.string.isRequired
}

export default Error
