import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EditProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    description: '',
    imageURL: '',
  });

  const { userId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/users/${userId}`)
      .then((res) => res.json())
      .then((userData) => {
        setUser(userData);
      });
  }, [userId]);

  const handleEditProfile = (evt) => {
    evt.preventDefault();

    // Validate the form fields here if needed

    fetch(`http://localhost:8088/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          // User profile update was successful, navigate to the profile page
          navigate(`/profile/${userId}`);
        } else {
          // Handle any errors or show a message to the user
          // For example:
          window.alert("Failed to update the user profile. Please try again.");
        }
      })
      .catch((error) => {
        console.error('Error updating the user profile:', error);
        // Handle errors appropriately, e.g., show an error message to the user
      });
  };

  return (
    <form className="profile-form">
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            required
            id="name"
            type="text"
            className="form-control"
            placeholder="Name"
            value={user.name}
            onChange={(event) => {
              const copy = { ...user };
              copy.name = event.target.value;
              setUser(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            required
            id="email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={user.email}
            onChange={(event) => {
              const copy = { ...user };
              copy.email = event.target.value;
              setUser(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            required
            id="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={user.password}
            onChange={(event) => {
              const copy = { ...user };
              copy.password = event.target.value;
              setUser(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            required
            id="description"
            className="form-control"
            placeholder="Description"
            value={user.description}
            onChange={(event) => {
              const copy = { ...user };
              copy.description = event.target.value;
              setUser(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="imageURL">Image URL:</label>
          <input
            required
            id="imageURL"
            type="text"
            className="form-control"
            placeholder="www.a-pic-of-you.com"
            value={user.imageURL}
            onChange={(event) => {
              const copy = { ...user };
              copy.imageURL = event.target.value;
              setUser(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="personalURL">Personal URL:</label>
          <input
            required
            id="personalURL"
            type="personalURL"
            className="form-control"
            placeholder="www.personalURL.com"
            value={user.personalURL}
            onChange={(event) => {
              const copy = { ...user };
              copy.personalURL = event.target.value;
              setUser(copy);
            }}
          />
        </div>
      </fieldset>
      <button
        className="btn"
        onClick={(event) => {
          handleEditProfile(event);
        }}
      >
        Save Changes
      </button>
    </form>
  );
};
