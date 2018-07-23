import React from 'react'
import './App.css'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
class SearchPage extends React.Component {
  state = {
    query: '',
    showingBooks: [],
  }
  updateQuery = (query) => {
    this.setState({query: query})
    let showingBooks = []
    if (query) {
      BooksAPI.search(query).then(response => {
        if (response.length) {
          showingBooks = response.map(b => {
            const index = this.state.books.findIndex(c => c.id === b.id)
            if( index >= 0 ) {
              return this.state.books[index]
            } else {
              return b
            }
          })
        }
        this.setState({showingBooks})
      })
    }
    else {
      this.setState({showingBooks})
    }
  }
    render(){ 
        return ( 
        <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input 
            value = {this.state.query}
            onChange = {(event) => {this.updateQuery(event.target.value)}}
            type="text"
             placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          </ol>
          
        </div>
      </div>
    )
}}


export default SearchPage