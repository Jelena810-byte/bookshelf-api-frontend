import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // logout via Django session logout URL
    await fetch('/api-auth/logout/', {
      method: 'GET',
      credentials: 'include'
    });
    setUser(null);
    navigate('/');
  };

  return (
    <div className="nav">
      <div><Link to="/">Bookshelf</Link></div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/books">My Books</Link>
        {!user ? (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        ) : (
          <>
            <span style={{marginLeft:12}}>Hi, {user}</span>
            <button className="btn" onClick={handleLogout} style={{marginLeft:12}}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
