import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Check session (call API root to see if logged in)
  useEffect(() => {
    fetch('/api/', { credentials: 'include' }) // this hits the redirect-to-login in your project-level urls; instead call api root directly
      .then(() => {
        // we still fetch the root endpoint / which returns public content; to check logged-in user, call / (root)
        return fetch('/', { credentials: 'include' });
      })
      .then(res => res.json())
      .then(data => {
        const message = data.message || '';
        if (message.includes('Logged in as')) {
          const parts = message.split('Logged in as ');
          if (parts[1] && parts[1] !== 'Anonymous') setUser(parts[1]);
        }
      })
      .catch(() => {
        // ignore
      });
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/books" element={<BookList user={user} />} />
          <Route path="/books/:id" element={<BookDetail user={user} />} /> 
        </Routes>
      </div>
    </Router>
  );
}
export default App;


