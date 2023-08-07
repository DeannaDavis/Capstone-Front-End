import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import './NavBar.css'
import logo from '../asset/logo.png'
import profile from '../asset/Profile.png'


export const NavBar = () => {
  const navigate = useNavigate()
  //const local = useLocation();
  const localHoneyUser = localStorage.getItem("book_user")
    const user = JSON.parse(localHoneyUser)
  console.log(user)
  return (
    <ul className="navbar">
      <Link className="logo__link navbar__link" to="/">
        <img className="logo__img" src={logo} alt="Literary Loft Logo" />
      </Link>
      <li className="navbar__item">
        <Link className="navbar__link" to="/fantasy">
          Fantasy
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/romance">
          Romance
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/scifi">
          SciFi
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/new">
          New Book
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/clubs">
          Book Clubs
        </Link>
      </li>
      <li className="navbar__item">
      <Link className="navbar__link" to="" onClick={() => { localStorage.clear();
      navigate("/", { replace: true });
       }}
     >
       Logout
     </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to={`/profile/${user.id}`}>
          <img className="profile__logo" src={profile} alt="Profile Logo" />
        </Link>
      </li>
    </ul>
  )
}