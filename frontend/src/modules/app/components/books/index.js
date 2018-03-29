import React, { Component } from 'react';
import container from './container';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import Error from '../../../../error';
import Loading from '../../../../loading';

class BookItem extends Component {
  render() {
    return (
      <div>
        <h2><Link to={`/books/${this.props.permalink}`}>{this.props.title}</Link></h2>
        <span class='blurb'>{this.props.blurb}</span>
      </div>
    )
  }
}

function Books({ data: { loading, error, books}}) {
  if (error) return <Error error={error.message} />;
  if (loading) return <Loading />;

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

export default compose(container)(Books);
