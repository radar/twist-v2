import React, { Component } from 'react';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import {chapterWithData} from './container';
import Loading from 'loading';
import Error from 'error';

class Element extends React.Component {
  createMarkup() {
    return {__html: this.props.content};
  }

  render() {
    return (
      <div>
        <div className='element' dangerouslySetInnerHTML={this.createMarkup()} />
      </div>
    )
  }
}


class Chapter extends Component {
  render () {
    const {data: {loading, error, book}} = this.props;

    if (error) return <Error error={error.message} />;
    if (loading) return <Loading />;

    const {bookPermalink, defaultBranch: {chapter: {title: chapterTitle, position, part, elements}}} = book;

    return (
      <div className='row'>
        <div id='chapter' className='main col-md-7'>
          <h1><Link to={`/books/${bookPermalink}`}>{book.title}</Link></h1>
          <h2>{position}. {chapterTitle}</h2>
          {elements.map(element => (
            <Element {...element} key={element.id} />
          ))}
        </div>
      </div>
    )
  }
};

export default compose(chapterWithData)(Chapter);
