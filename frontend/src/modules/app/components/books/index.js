import React, { Component } from 'react';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import errorWrapper from 'error_wrapper';
import loadingWrapper from 'loading_wrapper';

import container from './container';

class BookItem extends Component {
  render() {
    const {permalink, title, blurb} = this.props;
    return (
      <div>
        <h2><Link to={`/books/${permalink}`}>{title}</Link></h2>
        <span className='blurb'>{blurb}</span>
      </div>
    )
  }
}

class Books extends Component {
  render() {
    const {data: {books}} = this.props;

    return (
      <div className="row">
        <div className="main col-md-7">
          <h1>Your Books</h1>

          {books.map(book => (
            <BookItem {...book} key={book.id}></BookItem>
          ))}
        </div>
      </div>
    );
  }
}

export default compose(container)(errorWrapper(loadingWrapper(Books)));
