import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    isStaff: false,
  });

  const navigate = useNavigate();


    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("book_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        return fetch(`http://localhost:8088/users?email=${user.email}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then((response) => {
            if (response.length > 0) {
              // Duplicate email. No good.
              window.alert("Account with that email address already exists");
            } else {
              // Good email, create user.
              registerNewUser();
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            window.alert("An error occurred during login");
          });
      };
      
    
      const updateUser = (evt) => {
        const copy = { ...user };
        copy[evt.target.id] = evt.target.value;
        setUser(copy);
      };
    
      return (
        <main style={{ textAlign: "center" }}>
          <form className="form--login" onSubmit={handleRegister}>
            <h1 className="h3 mb-3 font-weight-normal">Please Register for Literary Loft!</h1>
            <fieldset>
              <label htmlFor="fullName">Full Name</label>
              <input
                onChange={updateUser}
                type="text"
                id="fullName"
                className="form-control"
                placeholder="Enter your name"
                required
                autoFocus
              />
            </fieldset>
            <fieldset>
              <label htmlFor="email">Email address</label>
              <input
                onChange={updateUser}
                type="email"
                id="email"
                className="form-control"
                placeholder="Email address"
                required
              />
            </fieldset>
            <fieldset>
              <input
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.isStaff = evt.target.checked;
                  setUser(copy);
                }}
                type="checkbox"
                id="isStaff"
              />
              <label htmlFor="email">I am book club owner!</label>
            </fieldset>
            <fieldset>
              <button type="submit">Register</button>
            </fieldset>
          </form>
        </main>
      );
    };

