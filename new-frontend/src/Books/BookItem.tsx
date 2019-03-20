import React, { Component } from 'react'
import { Link } from 'react-router-dom'

interface BookItemProps {
  title: string,
  permalink: string,
  blurb: string
}

export default class BookItem extends Component<BookItemProps> {
  render() {
    const { permalink, title, blurb } = this.props
    return (
      <div>
        <h2>
          <Link to={`/books/${permalink}`}>{title}</Link>
        </h2>
        <span className="blurb">{blurb}</span>
      </div>
    )
  }
}
