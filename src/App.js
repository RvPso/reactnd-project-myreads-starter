import React from 'react'
import './App.css'
import {Route, Link} from 'react-router-dom'
import SearchPage from './SearchPage.js'
import BookShelf from './BookShelf.js'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  
  state = {
    books: []
  }
  
  componentDidMount() { //subject to change
    BooksAPI.getAll().then(data => 
      this.setState({books : data})
    )}
    handleShelfData(book, shelf) {
      BooksAPI.update(book, shelf).then(()=>{
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(item => item.id !== book.id).concat([book])
        }))
      })
    }
  render() {
    return (
      <div className="app">
            <Route exact path='/search' render={()=>(
         < SearchPage/>
)}
  />
        <Route exact path='/' render={()=>(
         <div className="list-books">
         <div className="list-books-title">
           <h1>MyReads</h1>
         </div>
         <div className="list-books-content">
         <div>
           <BookShelf
           title='Currently Reading'
           books= {
             this.state.books.filter(item => item.shelf === 'currentlyReading')
           }
           sendShelfData={(book, shelf) => {this.handleShelfData(book, shelf)}}
           />
           <BookShelf
           title='Want to Read'
           books= {
             this.state.books.filter(item => item.shelf === 'wantToRead')
           }
           sendShelfData={(book, shelf) => {this.handleShelfData(book, shelf)}}
           />
           <BookShelf
           title='Read'
           books= {
             this.state.books.filter(item => item.shelf === 'read')
           }
           sendShelfData={(book, shelf) => {this.handleShelfData(book, shelf)}}
           />
         </div>
               </div>
         <div className="open-search">
           <Link to='/search' >Add a book</Link>
         </div>
         </div>
      
        )}
        />
          
      </div>
    )
  }
}

export default BooksApp