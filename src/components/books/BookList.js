import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import '../LiteraryLoft.css'

export const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8088/books')
            .then((res) => res.json())
            .then((booksData) => {
                setBooks(booksData)
            })
    }, [])

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
      };
    
      // Filter the list of books based on the search query
      const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
      return (
        <div className="book-container">
        <p className="main-header">Welcome To Our Main Library!</p>
        <p className="under-main">Looking for anything specific? Search through our books to find one perfect for you. Just browsing? Favortie any that catch your eye!</p>
          {/* Search bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for books here..."
            className="search-bar"
          />
    
          {filteredBooks.map((book) => {
            return (
              <div
                key={book.id}
                className="book-card"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                <img src={book.imageUrl} alt={book.name} className="book-img" />
                <div>{book.name}</div>
                <div className="author">{book.author}</div>
              </div>
            );
          })}
        </div>
      );
    };