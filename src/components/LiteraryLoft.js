import { useNavigate } from 'react-router-dom'
import { Authorized } from './auth/Authorized.js'
import './LiteraryLoft.css'
import { NavBar } from './nav/NavBar.js'
import { Route, Routes } from 'react-router-dom'
import { BookList } from './books/BookList.js'
import { NewBookForm } from './forms/NewBookForm.js'
import { FantasyList } from './books/FantasyList.js'
import { ScifiList } from './books/ScifiList.js'
import { RomanceList } from './books/RomanceList.js'
import { BookDetails } from './books/BookDetails.js'
import { EditBook } from './forms/EditBookForm.js'
import { EditProfile } from './profile/EditProfile.js'
import { Register } from './auth/Register.js'
import { Login } from './auth/Login.js'
import { Profile } from './profile/Profile.js'
import { ClubList } from './clubs/ClubList.js'



export const LiteraryLoft = () => {
  const navigate = useNavigate()

  //const logOut = () => {
    //localStorage.clear()
   // navigate('/')
  //}

  return (
    <>
      <Authorized>
        <NavBar />
        <Routes>
          <Route path="/" element={<Authorized />} />
          <Route index element={<BookList />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/users/:userId/edit" element={<EditProfile />} />
          <Route path="/clubs" element={<ClubList />} />
          <Route path="/Fantasy" element={<FantasyList />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
          <Route path="/Romance" element={<RomanceList />} />
          <Route path="/Scifi" element={<ScifiList />} />
          <Route path="/new" element={<NewBookForm />} />
          <Route path="/books/:bookId/edit" element={<EditBook />} />
        </Routes>
      </Authorized>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}
