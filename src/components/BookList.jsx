import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function BookList({ user }) {
  const [books, setBooks] = useState([]);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBooks();
    // eslint-disable-next-line
  }, [user]);

  const fetchBooks = async () => {
    const res = await fetch('/api/', { credentials: 'include' });
    if (res.status === 200) {
      const data = await res.json();
      setBooks(data);
    } else if (res.status === 403 || res.status === 401) {
      navigate('/login');
    } else {
      setErr('Failed to load books');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    const csrftoken = getCookie('csrftoken');
    const res = await fetch(`/api/${id}/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'X-CSRFToken': csrftoken }
    });
    if (res.status === 204) {
      setBooks(books.filter(b => b.id !== id));
    } else {
      setErr('Delete failed');
    }
  };

  return (
    <div>
      <div className="card">
        <h2>My Books</h2>
        <Link to="/books/new" className="btn btn-primary" style={{marginBottom:10}}>Add Book</Link>
        {err && <div style={{color:'red'}}>{err}</div>}
        <div className="book-grid">
          {books.map(book => (
            <div className="book-card" key={book.id}>
              <strong>{book.title}</strong>
              <div style={{fontSize:12}}>{book.author}</div>
              <div style={{marginTop:8}}>
                <Link to={`/books/${book.id}`} className="btn btn-primary" style={{fontSize:12}}>View</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(book.id)} style={{marginLeft:6,fontSize:12}}>Delete</button>
              </div>
            </div>
          ))}
          {books.length === 0 && <div>No books yet.</div>}
        </div>
      </div>
    </div>
  );
}
export default BookList;
