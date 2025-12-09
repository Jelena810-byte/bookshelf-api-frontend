import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function BookDetail({ user }) {
  const { id } = useParams(); // id or 'new'
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', author: '', description: '' });
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (id && id !== 'new') {
      fetchBook();
    }
    // eslint-disable-next-line
  }, [id, user]);

  const fetchBook = async () => {
    const res = await fetch(`/api/${id}/`, { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      setBook(data);
    } else {
      setErr('Failed to fetch book');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErr('');
    const csrftoken = getCookie('csrftoken');

    if (id === 'new') {
      // create
      const res = await fetch('/api/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
        body: JSON.stringify(book)
      });
      if (res.ok) {
        navigate('/books');
      } else {
        setErr('Create failed');
      }
    } else {
      // update
      const res = await fetch(`/api/${id}/`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
        body: JSON.stringify(book)
      });
      if (res.ok) {
        navigate('/books');
      } else {
        const text = await res.text();
        setErr('Update failed: ' + text);
      }
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <div className="card">
      <h2>{id === 'new' ? 'Add Book' : 'Edit Book'}</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Title</label>
          <input name="title" value={book.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input name="author" value={book.author} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={book.description} onChange={handleChange} />
        </div>
        <button className="btn btn-primary" type="submit">Save</button>
        <button type="button" className="btn" onClick={() => navigate('/books')} style={{marginLeft:8}}>Cancel</button>
      </form>
    </div>
  );
}
export default BookDetail;