import React from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book';
class SearchPage extends React.Component {
  state = {
    books: [],
    query: '',
  }
  updateQuery(query) {
    this.setState({query: query})
      if (query.trim()) {
      BooksAPI.search(query).then(data => {
        if (data.error){
          console.log(data.error)
          this.setState({
            books: []
          });
        } else {
          let updateShelf = data.filter(book => {
            for (let i = 0; i < this.props.shelfedBooks.length; i++) {
              if (this.props.shelfedBooks[i].id === book.id) {
                book.shelf = this.props.shelfedBooks[i].shelf;
              }
            }
            return book;
          })
          this.setState({
            books: updateShelf
          })
        }
      })
    } else {
      
      this.setState({books: []})
    }
    
  }
  sendShelfData(book, shelf) {
    this.props.sendShelfData(book, shelf);
}
    render(){
      const {books} = this.state;
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
          {(books.length !== 0 && this.state.query !== '') && books.map((book, index)=>{
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