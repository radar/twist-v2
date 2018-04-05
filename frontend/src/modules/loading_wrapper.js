// @flow
import * as React from 'react'
import Loading from './loading'

type Props = {
  data: {
    loading: boolean
  }
}

export default function loadingWrapper(WrappedComponent: React.ComponentType<any>) {
  class LoadingWrapper extends React.Component<Props> {
    render() {
      const { data: { loading } } = this.props

      if (loading) return <Loading />

      return <WrappedComponent {...this.props} />
    }
  }

  LoadingWrapper.displayName = 'LoadingWrapper'
  return LoadingWrapper
}
