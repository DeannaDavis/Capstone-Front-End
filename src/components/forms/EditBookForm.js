import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const EditBook = ({
 
}) => {
  const [genres, setGenres] = useState([])
  const [clubs, setClubs] = useState([])
  const [book, setBook] = useState({
    name: '',
    imageUrl: '',
    genreId: '',
    clubId: ''
  })
  const { bookId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8088/clubs')
      .then((res) => res.json())
      .then((clubData) => {
        setClubs(clubData)
      })

    fetch('http://localhost:8088/genres')
      .then((res) => res.json())
      .then((genresData) => {
        setGenres(genresData)
      })

    fetch(`http://localhost:8088/books/${bookId}`)
      .then((res) => res.json())
      .then((bookObj) => {
        setBook(bookObj)
      })
  }, [])

  const handleEditBook = (evt) => {
    evt.preventDefault();
  
    if (book.name && book.imageUrl && book.genreId && book.clubId) {
      fetch(`http://localhost:8088/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      })
      .then((response) => {
        if (response.ok) {
          // Book update was successful, navigate to the home page
          navigate("/");
        } else {
          // Handle any errors or show a message to the user
          // For example:
          window.alert("Failed to update the book. Please try again.");
        }
      })
      .catch((error) => {
        console.error('Error updating the book:', error);
        // Handle errors appropriately, e.g., show an error message to the user
      });
    } else {
      window.alert("Please finish filling out the form");
    }
  };
  

  return (
    <form className="book-form">
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            required
            id="name"
            type="text"
            className="form-control"
            placeholder="book"
            value={book.name}
            onChange={(event) => {
              const copy = { ...book }
              copy.name = event.target.value
              setBook(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            required
            id="author"
            type="text"
            className="form-control"
            placeholder="author"
            value={book.author}
            onChange={(event) => {
              const copy = { ...book }
              copy.name = event.target.value
              setBook(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="imgUrl">Image URL:</label>
          <input
            required
            id="imgUrl"
            type="text"
            className="form-control"
            placeholder="https://www.example.com"
            value={book.imageUrl}
            onChange={(event) => {
              const copy = { ...book }
              copy.imageUrl = event.target.value
              setBook(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="buyUrl">Link to Buy:</label>
          <input
            required
            id="buyUrl"
            type="text"
            className="form-control"
            placeholder="https://www.buyme.com"
            value={book.buy}
            onChange={(event) => {
              const copy = { ...book }
              copy.buy = event.target.value
              setBook(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Genre:</div>
          {genres.map((genre) => {
            return (
              <div key={genre.id} className="radio">
                <label>
                  <input
                    type="radio"
                    value={genre.id}
                    checked={book.genreId === genre.id}
                    onChange={(event) => {
                      const copy = { ...book }
                      copy.genreId = parseInt(event.target.value)
                      setBook(copy)
                    }}
                  />
                  {genre.name}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Book Club:</div>
          {clubs.map((club) => {
            return (
              <div key={club.id} className="radio">
                <label>
                  <input
                    type="radio"
                    value={club.id}
                    checked={book.clubId === club.id}
                    onChange={(event) => {
                      const copy = { ...book }
                      copy.clubId = parseInt(event.target.value)
                      setBook(copy)
                    }}
                  />
                  {club.name}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>
      <button
        className="btn"
        onClick={(event) => {
          handleEditBook(event)
        }}
      >
        Submit Changes
      </button>
    </form>
  )
}