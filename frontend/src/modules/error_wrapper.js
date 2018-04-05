// @flow
import * as React from 'react'
import Error from 'modules/error'

type Props = {
  data: {
    error: {
      message: string
    }
  }
}

export default function errorWrapper(WrappedComponent: React.ComponentType<any>) {
  class ErrorWrapper extends React.Component<Props> {
    render() {
      const { data: { error } } = this.props

      if (error) return <Error error={error.message} />

      return <WrappedComponent {...this.props} />
    }
  }

  ErrorWrapper.displayName = 'ErrorWrapper'
  return ErrorWrapper
}
