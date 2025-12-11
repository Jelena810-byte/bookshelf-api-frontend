import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BookCard from "./BookCard";
import "../styles/Home.css";


function Home({ user }) {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recommended books from backend
    const fetchRecommended = async () => {
      try {
        const response = await axios.get("http://localhost:8000/books/recommended/"); // adjust URL if needed
        setRecommendedBooks(response.data);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommended();
  }, []);

  return (
    <div className="home-container" style={{ padding: "1rem", maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* Welcome Card */}
      <div className="card" style={{ marginBottom: "1rem", padding: "1rem" }}>
        <h2>Welcome to Bookshelf</h2>
        <p>Manage your books. Sign in to view & manage your collection.</p>
        <p>
          <Link to="/books" className="btn btn-primary">Go to My Books</Link>
        </p>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginBottom: "1rem", padding: "1rem" }}>
        <h3>Quick Actions</h3>
        <ul>
          {!user && (
            <li>
              <Link to="/login">Sign in</Link> or <Link to="/signup">Sign up</Link> to start adding books.
            </li>
          )}
          {user && <li><Link to="/books">View or Add Books</Link></li>}
        </ul>
      </div>

      {/* Recommended Books */}
      <div className="card" style={{ marginBottom: "1rem", padding: "1rem" }}>
        <h3>Recommended Books</h3>
        {loading ? (
          <p>Loading recommended books...</p>
        ) : recommendedBooks.length === 0 ? (
          <p>No recommended books available.</p>
        ) : (
          <div
            className="book-list"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {recommendedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
