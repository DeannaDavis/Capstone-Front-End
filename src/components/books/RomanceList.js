import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export const RomanceList = ({ }) => {
  const [romance, setRomance] = useState([]) // returns an array: [stateVariable, setStatefunction] takes one argument: the initial value of the state variable
  const navigate = useNavigate()

  // Use Effect watches for state change
  // It takes two arguments, a function and an array
  // The array is which states we want to observe
  // The function is what we want to do when that observed state changes
  useEffect(() => {
    console.log('I only run once')
    fetch(`http://localhost:8088/books?genreId=2`)
      .then((res) => res.json())
      .then((booksArray) => {
        setRomance(booksArray)
      })
  }, []) // An empty dependency array will watch for the initial render of the component and only run the callback on that  initial run.

  return (
    <div className="book-container">
      <p className="romance-header">ro·mance</p>
      <p className='romance-def'>Romance or romantic love is a feeling of love for, or a strong attraction towards another person, and the courtship behaviors undertaken by an individual to express those overall feelings and resultant emotions. </p>
      {romance.map((book) => {
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