import React,{Component} from 'react';
import Book from './Book';
class BookShelf extends Component {
    sendShelfData(book, shelf) {
        this.props.sendShelfData(book, shelf)
    }
    render() {
        return(
            <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.length > 0 && this.props.books.map((item)=>(
                      <Book key = {item.id} book = {item} sendShelfData = {(book, shelf) => {this.sendShelfData(book, shelf)}} />
                  ))}
                  
                  
            
                </ol>
                </div>
                </div>
                </div>
        ) 
    }
}
export default BookShelf