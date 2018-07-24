import React from 'react'
import './App.css'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book';
class SearchPage extends React.Component {
  state = {
    books: [],
    book: [],
  }
  updateQuery(query) {
    if (!!query) {
      BooksAPI.search(query).then(data => {
        if (!!data.error){
          console.log(data.error)
          this.setState({
            books: []
          });
        } else {
          let updateShelf = data.map(book => {
            for (var i = 0; i < this.props.shelfedBooks.length; i++) {
              if (this.props.shelfedBooks[i].id === book.id) {
                book.shelf = this.props.shelfedBooks[i].shelf;
              }
            }
            console.log(book);
            return book;
          })
          this.setState({
            books: updateShelf
          })
        }
      })
    }
  }
  sendShelfData(value) {
    this.props.sendShelfData(this.props.book, value);
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
          <ol className="books-grid">{
            this.state.books.length !== 0 && this.state.books.map((book, index)=>{
           return <Book key = {index} book = {book} sendShelfData = {(book, shelf) => {this.sendShelfData(book, shelf)}}
           />
            })
          }
          </ol>
          
        </div>
      </div>
    )
}}


export default SearchPage