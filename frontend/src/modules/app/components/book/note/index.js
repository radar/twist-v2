// @flow
import * as React from 'react'
import { noteWithData } from './container'
import { compose } from 'react-apollo'

import errorWrapper from 'modules/error_wrapper'
import loadingWrapper from 'modules/loading_wrapper'

class BookNote extends React.Component<{}> {
  render() {
    return (
      <div>
        NOTE GOES HERE
      </div>
    )
  }
}
export default compose(noteWithData)(errorWrapper(loadingWrapper(BookNote)))
