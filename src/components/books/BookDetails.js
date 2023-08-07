import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../LiteraryLoft.css';
import { v4 as uuidv4 } from 'uuid';


export const BookDetails = () => {
    const [book, setBook] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [commentIdCounter, setCommentIdCounter] = useState(1);
    const [newCommentRating, setNewCommentRating] = useState(1);




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

    const handleDeleteComment = (commentId) => {
        // Filter out the comment with the specified commentId
        const updatedComments = comments.filter(comment => comment.commentId !== commentId);
    
        // Update the book's comments in the database
        fetch(`http://localhost:8088/books/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comments: updatedComments,
            }),
        })
        .then((res) => res.json())
        .then((updatedBookData) => {
            setBook({
                ...updatedBookData,
                club: book.club,
            });
            setComments(updatedComments); // Update local comments state
        })
        .catch((error) => {
            console.error("Error deleting comment:", error);
        });
    };
    
    

    const handleSubmitComment = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8088/users/${loggedInUserId}`)
        .then((res) => res.json())
        .then((userData) => {
            const commentData = {
                commentId: uuidv4(), // Generate a unique commentId
                userId: loggedInUserId,
                username: userData.name,
                text: newComment,
                rating: newCommentRating, // Include the comment rating
            };


            setCommentIdCounter(commentIdCounter + 1);

            // Add the comment to the local state
            setComments((prevComments) => [...prevComments, commentData]);
            setNewComment("");
            setNewCommentRating(0); // Reset the rating to 0

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
            setBook({
                ...updatedBookData,
                club: book.club,
                comments: updatedBookData.comments,
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
                            <li key={comment.commentId} className="comment-item">
                                <strong>{comment.username}:</strong> {comment.text}
                                <div className="comment-rating">
                                    Rating: {comment.rating} stars
                                </div>
                                {loggedInUserId === comment.userId && (
                                    <img
                                        src="/litter.png"
                                        alt="Delete"
                                        className="delete-comment-icon"
                                        onClick={() => handleDeleteComment(comment.commentId)}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>

                )}
            </div>

            {/* Comment submission form */}
            <form onSubmit={handleSubmitComment}>
                <div className="comment-box">
                    <div className="comment-rating">
                        <label>Rating: </label>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <label key={rating}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={rating}
                                    checked={newCommentRating === rating}
                                    onChange={() =>{
                                        console.log("Selected rating:", rating);
                                        setNewCommentRating(rating);
                                    }}
                                />
                                {rating} stars
                            </label>
                        ))}
                    </div>
                    <textarea className="comment-input"
                        placeholder="Leave a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </div>
                <button className="submit-button">Submit Comment</button>
            </form>

        </>
    );
};



