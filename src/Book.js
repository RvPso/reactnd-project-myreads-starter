import React, {Component} from 'react';

class Book extends Component {
    handleShelfData(value) {
        this.props.sendShelfData(this.props.book, value);
    }
    render() {
        let bookCover;
        if (this.props.book.imageLinks !== undefined) {
            
        }
        let image = {
            width: 128,
            height: 193,
            
        }
        return(
            <li>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{image}}></div>
                <div className="book-shelf-changer">
                  <select
                   value={this.props.book.shelf}
                   onChange={(event) => this.handleShelfData(event.target.value)}
                  >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.book.title}</div>
              <div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(', '): ''}</div>
            </div>
</li>
        )
    }
}

export default Book