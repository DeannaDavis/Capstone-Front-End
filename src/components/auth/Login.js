import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from '../asset/logo.png'

export const Login = () => {
    // State variable to store the email input value
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    // Hook from react-router-dom to handle navigation
    const navigate = useNavigate();
  
    // Function to handle the login form submission
    const handleLogin = (e) => {
      e.preventDefault();
  
      // Fetch user data from the server based on the email input value
      fetch(`http://localhost:8088/users?email=${encodeURIComponent(email)}`)
        .then((res) => {
          if (!res.ok) {
            // If there's a network error or server response is not ok, throw an error
            throw new Error('Network response was not ok');
          }
          // Parse the response as JSON and return it
          return res.json();
        })
        .then((foundUsers) => {
          // If a single user with the provided email is found, proceed with login
          if (foundUsers.length === 1) {
            // Get the user object from the response
            const user = foundUsers[0];
  
            // Store user information in localStorage for authentication
            localStorage.setItem("book_user", JSON.stringify({
              id: user.id,
              email: user.email,
              name: user.name,
              isStaff: user.isStaff,
              password: user.password
            }));
  
            // Navigate to the profile page after successful login
            navigate(`/profile/${user.id}`)
            } else {
            // Show an alert if the login is invalid (no user found)
            window.alert("Invalid login");
          }
        })
        .catch((error) => {
          // Log any errors occurred during login
          console.error('Error fetching user data:', error);
          console.error('Response status:', error.status);
          // Show an alert for any other errors during login
          window.alert("An error occurred during login");
        });
    };
  

  return (
    <main className="container--login">
      <section>
        {/* Login Form */}
        <form className="form--login" onSubmit={handleLogin}>
          {/* Banner section */}
          <div className="banner">
            {/* Left logo */}
            <img className="logo__img" src={logo} alt="Literary Loft Logo" />
            {/* Heading */}
            <header className="welcome-banner">Welcome to our library! Please sign in to get started...</header>
            {/* Right logo */}
            <img className="logo_right" src={logo} alt="Literary Loft Logo Left" />
          </div>

          {/* Subheading */}
          <h2>Please sign in</h2>
          <fieldset>
            {/* Email input field */}
            <label className="email-input" htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              value={email}
              // Update email state when the input value changes
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-control"
              placeholder="example@example.com"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            {/* Password input field */}
            <label className="password-input" htmlFor="inputPassword"> Password </label>
            <input
              type="password"
              value={password}
              // Update email state when the input value changes
              onChange={(evt) => setPassword(evt.target.value)}
              className="form-control"
              placeholder="***"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            {/* Sign in button */}
            <button className="button" type="submit">Sign in</button>
          </fieldset>
        </form>
      </section>
      {/* Register link */}
      <section className="link--register">
        <Link className="register-button" to="/register" location={'/register'}>Not a member yet?</Link>
      </section>
    </main>
  );
};
