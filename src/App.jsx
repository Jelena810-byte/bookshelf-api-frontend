import React, { useState, useEffect } from 'react';
import { verifyUser } from './services/users.js'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import CreateBook from './components/CreateBook.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      user ? setUser(user) : setUser(null);
    };

    fetchUser();
  }, []);
  

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div className="container">

        <Routes>
          <Route path="/" element={<Home setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/books" element={<BookList setUser={setUser} />} />
          <Route path="/books/:id" element={<BookDetail setUser={setUser} />} /> 
          <Route path="/books/new" element={<CreateBook setUser={setUser}/>} />

        </Routes>
      </div>
    </>
  );
}

export default App;

