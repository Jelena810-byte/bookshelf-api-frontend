// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Navbar({ user, setUser }) {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     // logout via Django session logout URL
//     await fetch('/api-auth/logout/', {
//       method: 'GET',
//       credentials: 'include'
//     });
//     setUser(null);
//     navigate('/');
//   };

//   return (
//     <div className="nav">
//       <div><Link to="/">Bookshelf</Link></div>
//       <div>
//         <Link to="/">Home</Link>
//         <Link to="/books">My Books</Link>
//         {!user ? (
//           <>
//             <Link to="/login">Sign in</Link>
//             <Link to="/signup">Sign up</Link>
//           </>
//         ) : (
//           <>
//             <span style={{marginLeft:12}}>Hi, {user}</span>
//             <button className="btn" onClick={handleLogout} style={{marginLeft:12}}>Logout</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('/api-auth/logout/', {
      method: 'GET',
      credentials: 'include'
    });

    setUser(null);
    navigate('/');
  };

  return (
    <div className="navbar">
      {/* Left side — Brand */}
      <div className="navbar-left">
        <Link to="/">Bookshelf</Link>
      </div>

      {/* Right side — Links */}
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/books">My Books</Link>

        {!user ? (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        ) : (
          <>
            <span className="navbar-user">Hi, {user}</span>
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
