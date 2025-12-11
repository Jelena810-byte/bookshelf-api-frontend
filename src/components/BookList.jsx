import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {getBooks, deleteBook} from '../services/books';


function BookList() {
  const [books, setBooks] = useState([]);
  const [err, setErr] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await getBooks()
      setBooks(booksData)
    }

    fetchBooks()
  }, [])


  const handleDelete = async (id) => {
    // if (!window.confirm('Delete this book?')) return;
    // // const csrftoken = getCookie('csrftoken');
    // const res = await fetch(`/api/${id}/`, {
    //   method: 'DELETE',
    //   credentials: 'include',
    //   headers: { 'X-CSRFToken': csrftoken }
    // });
    // if (res.status === 204) {
    //   setBooks(books.filter(b => b.id !== id));
    // } else {
    //   setErr('Delete failed');
    // }
    await deleteBook(id)
  };


  return (
    <div>
      <div className="card">
        <h2>My Books</h2>
        <Link to="/books/new" className="btn btn-primary" style={{marginBottom:10}}>Add Book</Link>
        {err && <div style={{color:'red'}}>{err}</div>}
        <div className="book-grid">
          {books.length && books.map(book => (
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
