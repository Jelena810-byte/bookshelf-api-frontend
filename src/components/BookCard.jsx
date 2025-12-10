import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="book-card" style={{
      border: "1px solid #ccc",
      padding: "1rem",
      width: "200px",
      borderRadius: "8px",
      boxShadow: "2px 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h4>{book.title}</h4>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p>{book.description?.substring(0, 60)}{book.description && book.description.length > 60 ? "..." : ""}</p>
      <Link to={`/books/${book.id}`} style={{ color: "#007bff" }}>View Details</Link>
    </div>
  );
}

export default BookCard;
