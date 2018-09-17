import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  getAll = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  //get all books before loading the component
  componentDidMount() {
    this.getAll();
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    this.getAll();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <MainPage
              books={this.state.books}
              updateShelf={this.updateShelf}
            />
        )}/>
        <Route path="/search" render={() => (
            <SearchPage
              updateShelf={this.updateShelf}
              books={this.state.books}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
