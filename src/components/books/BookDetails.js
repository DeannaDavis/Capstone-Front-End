import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../LiteraryLoft.css';

export const BookDetails = () => {
    const [book, setBook] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [loggedInUserId, setLoggedInUserId] = useState(null);


    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("book_user"));
    
        if (loggedInUser) {
            fetch(`http://localhost:8088/users/${loggedInUser.id}`)
                .then((res) => res.json())
                .then((userData) => {
                    setLoggedInUserId(userData.id);
                });
        }
    
        fetch(`http://localhost:8088/books/${bookId}?_expand=genre&_expand=club`)
            .then((res) => res.json())
            .then((bookData) => {
                setBook(bookData);
                setComments(bookData.comments);
            });
    
        const favoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
        setIsFavorite(favoriteBooks.includes(bookId));
    }, [bookId]);
    
    

    const handleFavorite = () => {
        const favoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
        const updatedFavorites = isFavorite
            ? favoriteBooks.filter((favId) => favId !== bookId)
            : [...favoriteBooks, bookId];

        localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    const handleDelete = () => {
        fetch(`http://localhost:8088/books/${bookId}`, {
            method: 'DELETE',
        })
        .then(() => navigate("/"));
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
    
        // Fetch user's name using the loggedInUserId
        fetch(`http://localhost:8088/users/${loggedInUserId}`)
            .then((res) => res.json())
            .then((userData) => {
                const commentData = {
                    userId: loggedInUserId,
                    username: userData.name, // Add the username to the comment data
                    text: newComment,
                };
    
                // Add the comment to the local state
                setComments((prevComments) => [...prevComments, commentData]);
                setNewComment("");
    
                // Update the book's comments in the database
                return fetch(`http://localhost:8088/books/${book.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        comments: [...book.comments, commentData],
                    }),
                });
            })
            .then((res) => res.json())
            .then((updatedBookData) => {
                // Make sure to include the club data in the updatedBookData
                setBook({
                    ...updatedBookData,
                    club: book.club, // Preserve the club data
                });
            })
            .catch((error) => {
                console.error("Error submitting comment:", error);
            });
    };
    
    
    
    


    if (!book) {
        return null;
    }

    return (
        <>
            <div key={book.id} className="book-card">
                <img
                    src={book.imageUrl}
                    alt={book.name}
                    className="book-img"
                />
                <div className="book-name">{book.name}</div>
                <div className="book-author">{book.author}</div>
                
                {/* Book Club */}
                <div className="book-club">
                    {book.club ? (
                        <>{book.club.name}</>
                    ): (
                        <>No Club</>
                    )} 
                </div>

                <div className="book-description">{book.description}</div>

                <div className="button-container">
                    <button className="buttons" onClick={() => navigate(`/books/${book.id}/edit`)}>
                        Edit
                    </button>
                    <button className="buttons" onClick={handleDelete}>
                        Delete
                    </button>
                <div>
                    {book.buy && (
                        <a href={book.buy} target="_blank" rel="noopener noreferrer">
                            <button className="buy-button">Buy Now</button>
                        </a>
                    )}
                </div>
                </div>
                {/* Favorite button */}
                <div className="favorite-button" onClick={handleFavorite}>
                    <img
                        src={isFavorite ? "/bookmark.png" : "/empty-bookmark.png"}
                        alt="Favorite"
                        className="favorite-icon"
                    />
                </div>
            </div>

            {/* Comments section */}
            <div className="comments-section">
                <h3 className="comments-header">Comments</h3>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    <ul className="comment-list">
                        {comments.map((comment) => (
                            <li key={comment.id} className="comment-item">
                                <strong>{comment.username}:</strong> {comment.text}
                            </li>
                        ))}
                    </ul>

                )}
            </div>

            {/* Comment submission form */}
            <form onSubmit={handleSubmitComment}>
                <textarea className="comment-box"
                    placeholder="Leave a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="submit-button">Submit Comment</button>
            </form>
        </>
    );
};


