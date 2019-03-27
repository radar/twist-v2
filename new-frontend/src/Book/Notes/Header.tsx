import * as React from "react";
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

import QueryWrapper from "../../QueryWrapper"

import BookQuery from "./BookQuery"

type HeaderProps = {
  permalink: string,
}

export default class Header extends React.Component<HeaderProps> {
  render() {

    const {permalink} = this.props;
    return (
      <QueryWrapper query={BookQuery} variables={{bookPermalink: permalink}}>
        {({book}) => {
          return (
            <h1>
              <Link to={`/books/${permalink}`}>{book.title}</Link> - Notes
            </h1>
          )
        }}
      </QueryWrapper>
    )
  }
}
