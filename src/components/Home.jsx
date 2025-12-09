import React from 'react';
import { Link } from 'react-router-dom';

function Home({ user }) {
  return (
    <div>
      <div className="card">
        <h2>Welcome to Bookshelf</h2>
        <p>Manage your books. Sign in to view & manage your collection.</p>
        <p>
          <Link to="/books" className="btn btn-primary">Go to My Books</Link>
        </p>
      </div>
      <div className="card">
        <h3>Quick actions</h3>
        <ul>
          {!user && <li><Link to="/login">Sign in</Link> or <Link to="/signup">Sign up</Link> to start adding books.</li>}
          {user && <li><Link to="/books">View or Add Books</Link></li>}
        </ul>
      </div>
    </div>
  );
}
export default Home;
