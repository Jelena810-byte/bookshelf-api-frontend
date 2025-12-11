import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from "../services/users.js";


function Login({ setUser }) {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [err, setErr] = useState('');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    isError: false,
    errorMsg: "",
  });

   const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = await signIn(form);
      setUser(userData);

      navigate("/books");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        isError: true,
        errorMsg: "Invalid Credentials",
        username: prevForm.username,
        password: "",
      }));
    }
  };

  const renderError = () => {
    const toggleForm = form.isError ? "danger" : "";

  };




  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setErr('');

  //   // ensure CSRF cookie exists by fetching the root (or any GET) first
  //   await fetch('/', { credentials: 'include' });

    

  //   const form = new URLSearchParams();
  //   form.append('username', username);
  //   form.append('password', password);

  //   const res = await fetch('/api-auth/login/', {
  //     method: 'POST',
  //     body: form,
  //     credentials: 'include',
  //     headers: {
  //       'X-CSRFToken': csrftoken
  //     }
  //   });

  //   if (res.ok) {
  //     setUser(username);
  //     navigate('/books');
  //   } else {
  //     setErr('Login failed. Check your username and password.');
  //   }
  // };

  return (
    <div className="card">
      <h2>Sign In</h2>
      {/* {err && <div style={{color:'red'}}>{err}</div>} */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type='text'
            name='username'
            value={form.username}
            placeholder='Enter Username'
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={form.password}
            placeholder='Enter Password'
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        {renderError()}
        <button className="btn btn-primary" type="submit">Sign in</button>
      </form>
    </div>
  );
}
export default Login;

