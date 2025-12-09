import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    // ensure CSRF cookie exists by fetching the root (or any GET) first
    await fetch('/', { credentials: 'include' });

    const csrftoken = getCookie('csrftoken');

    const form = new URLSearchParams();
    form.append('username', username);
    form.append('password', password);

    const res = await fetch('/api-auth/login/', {
      method: 'POST',
      body: form,
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrftoken
      }
    });

    if (res.ok) {
      setUser(username);
      navigate('/books');
    } else {
      setErr('Login failed. Check your username and password.');
    }
  };

  return (
    <div className="card">
      <h2>Sign In</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" />
        </div>
        <button className="btn btn-primary" type="submit">Sign in</button>
      </form>
    </div>
  );
}
export default Login;
