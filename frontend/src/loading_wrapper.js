import React, { Component } from 'react'
import Loading from 'loading'
import PropTypes from 'prop-types'

export default function loadingWrapper (WrappedComponent) {
  class LoadingWrapper extends Component {
    render () {
      const {data: {loading}} = this.props

      if (loading) return <Loading />

      return <WrappedComponent {...this.props} />
    }
  }

  LoadingWrapper.propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.function
    })
  }

  LoadingWrapper.displayName = 'LoadingWrapper'
  return LoadingWrapper
}
