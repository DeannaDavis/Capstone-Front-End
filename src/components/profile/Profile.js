import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Profile.css';

export const Profile = () => {
  // Get the location from the react-router-dom hook
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [clubOwned, setClubOwned] = useState({});
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8088/users/${userId}`)
      .then((res) => res.json())
      .then((userData) => {
        setUser(userData);

        // Fetch clubOwned information using the clubId from the user
        fetch(`http://localhost:8088/clubs/${userData.clubOwned}`)
          .then((res) => res.json())
          .then((clubData) => {
            setClubOwned(clubData);
          })
          .catch((error) => {
            console.error('Error fetching clubOwned data:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    // Get the list of favorited book IDs from localStorage
    const favoriteBooksIds = JSON.parse(localStorage.getItem('favoriteBooks')) || [];

    // Fetch book details for each favorited book
    Promise.all(
      favoriteBooksIds.map((bookId) =>
        fetch(`http://localhost:8088/books/${bookId}?_expand=genre&_expand=club`)
          .then((res) => res.json())
      )
    )
      .then((favoriteBooksData) => {
        setFavoriteBooks(favoriteBooksData);
      })
      .catch((error) => {
        console.error('Error fetching favorite books:', error);
      });
  }, [userId]);

  // If the user object is not available (e.g., direct navigation to /profile without login)
  // You can handle it based on your application's requirements, e.g., redirect to login page
  if (!user) {
    // Handle the case when the user is not logged in
    // You can add a redirect here or display an error message
    return <div>You are not logged in. Please login to view your profile.</div>;
  } else {
    return (
      <div className="profile-view">
        {user.imageURL && <img src={user.imageURL} alt="Profile" className="profile-image" />}
        <h1>Welcome, {user.name}!</h1>
        <div className="profile-details">
          <p>Your Description: {user.description}</p>
          <p>Email: {user.email}</p>
          <p>Are you a book club Owner? {user.isStaff ? 'Yes' : 'No'}</p>
          <p>Clubs Owned: {user.clubOwned}</p>
          {/* Making the Personal URL clickable */}
          {user.personalURL && (
            <p>
              Personal URL: <a href={user.personalURL}>{user.personalURL}</a>
            </p>
          )}
          <button className="edit-btn" onClick={() => navigate(`/users/${user.id}/edit`)}>
            Edit
          </button>
        </div>
        <header className="book-info-title">Books you are interested in!</header>
        <div className="favorited-books">
          {favoriteBooks.map((book) => (
            <div key={book.id} className="book-favorite">
              <img src={book.imageUrl} alt={book.name} className="book-img" />
              {/* Add more book details if needed */}
            </div>
          ))}
        </div>
      </div>
    );
  }
};