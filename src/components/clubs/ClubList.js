
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import './ClubList.css';

export const ClubList = () => {
  const [clubs, setClubs] = useState([]);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8088/users/${userId}`)
        .then((res) => res.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleJoinClub = (clubId) => {
    if (userId) {
      fetch(`http://localhost:8088/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clubOwned: clubId }),
      })
        .then((res) => res.json())
        .then((updatedUserData) => {
          setUser(updatedUserData);
          alert(`You have joined the club with ID: ${clubId}`);
        })
        .catch((error) => {
          console.error('Error updating user data:', error);
        });
    }
  };

  useEffect(() => {
    fetch('http://localhost:8088/clubs')
      .then((res) => res.json())
      .then((clubsArray) => {
        setClubs(clubsArray);
      });

    fetch('http://localhost:8088/books')
      .then((res) => res.json())
      .then((booksArray) => {
        setBooks(booksArray);
      });
  }, []);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  const handleOpenModal = (club) => {
    setSelectedClub(club);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="clubs-list-container">
      <header className='welcome-genres'>Join Our Book Clubs!</header>
      <header className='sub-heading'>Connect to one of our book clubs as a stepping stone into a new love of books! Want to learn more about the individual clubs? Go ahead and click on the titles for a small decription to help you find the perfect group for you!</header>
      {/* Render the club titles */}
      {clubs.map((club) => (
        <div key={club.id} className="club-container">
          <div id="club-title-section" onClick={() => handleOpenModal(club)}>
            <h2 className='club-title'>{club.name}</h2>
          </div>
          {/* Render the join button */}
          <button id="join-button" onClick={() => handleJoinClub(club.id)}>
            Join
          </button>
          <div className="books-container">
            {books
              .filter((book) => book.clubId === club.id)
              .map((book) => (
                <div className="book-card-club" key={book.id}>
                  <img
                    src={book.imageUrl}
                    alt={book.name}
                    className="book-img"
                  />
                  <div className="book-name">{book.name}</div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* The modal to show club details */}
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}
        style={{
          content: {
            background: 'rgb(216, 200, 178)'
          }
        }
        }>
        {selectedClub && (
          <div>
            <h2>{selectedClub.name}</h2>
            <p>{selectedClub.description}</p>
            <img src={selectedClub.imageURL} alt={selectedClub.name} className="club-img" />
            <button onClick={handleCloseModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};



