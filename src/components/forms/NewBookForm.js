import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NewBookForm = () => {
  const [genres, setGenres] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [userChoices, setUserChoices] = useState({
    name: '',
    imageUrl: '',
    genreId: '',
    clubId: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8088/clubs')
      .then((res) => res.json())
      .then((clubsData) => {
        setClubs(clubsData);
      });

    fetch('http://localhost:8088/genres')
      .then((res) => res.json())
      .then((genresData) => {
        setGenres(genresData);
      });
  }, []);

  const handleSaveBook = (evt) => {
    evt.preventDefault();

    userChoices.name &&
    userChoices.imageUrl &&
    userChoices.genreId &&
    userChoices.clubId
      ? fetch('http://localhost:8088/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userChoices),
        }).then(() => navigate('/'))
      : window.alert('Please finish filling out the form');
  };

  return (
    <form className="book-form">
      <h2 className="book-form-title">Add a book to the library!</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            required
            id="name"
            type="text"
            className="form-control"
            placeholder="Book Name"
            value={userChoices.name}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.name = event.target.value;
              setUserChoices(copy);
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
            placeholder="Author"
            value={userChoices.author}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.author = event.target.value;
              setUserChoices(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Description</label>
          <input
            required
            id="description"
            type="text"
            className="form-control"
            placeholder="Book Description"
            value={userChoices.description}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.description = event.target.value;
              setUserChoices(copy);
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
            value={userChoices.imageUrl}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.imageUrl = event.target.value;
              setUserChoices(copy);
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
            value={userChoices.buy}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.buy = event.target.value;
              setUserChoices(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            className="form-control"
            value={userChoices.genreId}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.genreId = event.target.value;
              setUserChoices(copy);
            }}
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="club">Book Club:</label>
          <select
            id="club"
            className="form-control"
            value={userChoices.clubId}
            onChange={(event) => {
              const copy = { ...userChoices };
              copy.clubId = event.target.value;
              setUserChoices(copy);
            }}
          >
            <option value="">Select a book club</option>
            {clubs.map((club) => (
              <option key={club.id} value={club.id}>
                {club.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn" onClick={handleSaveBook}>
        Add book
      </button>
    </form>
  );
};
