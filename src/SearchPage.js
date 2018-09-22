import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchPage extends Component {
  state = {
    query: '',
  }

  updateQuery = (query) => {
    BooksAPI.search(query);
    this.setState({ query })
  }

  render () {
    let showingBooks
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingBooks = this.props.books.filter((book) => match.test(book.title || book.authors))
    } else {
      showingBooks = [];
    }

    showingBooks.sort(sortBy('title'))

    return (
      <div className="search-books">
          <div className="search-books-bar">
            <Link
              to="/"
              className="close-search"
            >Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                showingBooks.map(showingBook => {
                  let shelf = "none";
                  this.props.books.map(book => (
                    book.id === showingBook.id ?
                    shelf = book.shelf : ''
                  ));

                  return(
                    <li key={showingBook.id}>
                    <Book
                      book={showingBook}
                      updateShelf={this.props.updateShelf}
                      currentShelf={shelf}
                    />
                  </li>
                  );
                })
               }
            </ol>
          </div>
        </div>
    );
  }
}

export default SearchPage
