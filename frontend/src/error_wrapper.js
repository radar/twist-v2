import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Error from 'error'

export default function errorWrapper (WrappedComponent) {
  class ErrorWrapper extends Component {
    render () {
      const {data: {error}} = this.props

      if (error) return <Error error={error.message} />

      return <WrappedComponent {...this.props} />
    }
  }

  ErrorWrapper.propTypes = {
    data: PropTypes.shape({
      error: PropTypes.string.isRequired
    })
  }

  ErrorWrapper.displayName = 'ErrorWrapper'
  return ErrorWrapper
}
