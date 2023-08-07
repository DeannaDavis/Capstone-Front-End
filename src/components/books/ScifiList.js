import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ScifiList = () => {
  const [scifi, setScifi] = useState([]) // returns an array: [stateVariable, setStatefunction] takes one argument: the initial value of the state variable
  // const navigate = useNavigate()
  // Use Effect watches for state change
  // It takes two arguments, a function and an array
  // The array is which states we want to observe
  // The function is what we want to do when that observed state changes
  useEffect(() => {
    console.log('I only run once')
    fetch(`http://localhost:8088/books?genreId=3`)
      .then((res) => res.json())
      .then((booksArray) => {
        setScifi(booksArray)
      })
  }, []) // An empty dependency array will watch for the initial render of the component and only run the callback on that  initial run.

  const navigate = useNavigate()

  return (
    <div className="book-container">
      <p className="scifi-header">sci·fi</p>
      <p className='scifi-def'>Science fiction, popularly shortened as sci-fi, is a genre of fiction that creatively depicts real or imaginary science and technology as part of its plot, setting, or theme.The fiction part of science fiction means, of course, that it’s a fictional story—not a real-life account.</p>
      {scifi.map((book) => {
        return (
          <div className="book-card" key={book.id}>
            <img
              src={book.imageUrl}
              alt={book.name}
              className="book-img"
              onClick={() => {
                navigate(`/books/${book.id}`)
              }}
            />
            <div className="book-name">{book.name}</div>
          </div>
        )
      })}
    </div>
  )
}