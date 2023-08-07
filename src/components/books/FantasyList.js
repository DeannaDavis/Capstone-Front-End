import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const FantasyList = () => {
  const [fantasyBooks, setFantasyBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('I only run once');
    fetch('http://localhost:8088/books?genreId=1')
      .then((res) => res.json())
      .then((booksArray) => {
        setFantasyBooks(booksArray);
      });
  }, []);

  return (
    <div className="book-container">
      <p className="fantasy-header">fan·ta·sy</p>
      <p className='fantasy-def'>In psychology, fantasy is a broad range of mental experiences, mediated by the faculty of imagination in the human brain, and marked by an expression of certain desires through vivid mental imagery. Fantasies are generally associated with scenarios that are impossible.</p>
      {fantasyBooks.map((book) => {
        return (
          <div className="book-card" key={book.id}> {/* Ensure each book has a unique key */}
            <img
              src={book.imageUrl}
              alt={book.name}
              className="book-img"
              onClick={() => {
                navigate(`/books/${book.id}`);
              }}
            />
            <div className="book-name">{book.name}</div>
          </div>
        );
      })}
    </div>
  );
};
