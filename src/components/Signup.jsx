import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    await fetch('/', { credentials: 'include' });
    const csrftoken = getCookie('csrftoken');

    const res = await fetch('/api/signup/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({ username, email, password })
    });

    if (res.ok) {
      navigate('/login');
    } else {
      const text = await res.text();
      setErr(`Signup failed: ${text}`);
    }
  };

  return (
    <div className="card">
      <h2>Sign Up</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" />
        </div>
        <button className="btn btn-primary" type="submit">Sign up</button>
      </form>
    </div>
  );
}
export default Signup; 