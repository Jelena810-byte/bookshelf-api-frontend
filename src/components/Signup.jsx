import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from "../services/users.js";

function Signup() {
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [password_confirmation, setPasswordConfirmation] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
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
      const userData = await signUp(form);
      setUser(userData);

      navigate("/books");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        isError: true,
        errorMsg: "Invalid Credentials",
        username: prevForm.username,
        email: "",
        password: "",
      }));
    }
  };



  return (
    <div className="card">
      <h2>Sign Up</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
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
          <label>Email</label>
          <input 
            type='email'
            name='email'
            value={form.email}
            placeholder='Enter email'
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
          <div>
          <label>Password confirmation</label>
          <input 
            type='password'
            name='password_confirmation'
            value={form.password_confirmation}
            placeholder='Re-type the password'
            onChange={handleChange}
            required
            autoComplete="off"/>
          </div>
        <button onClick={() => navigate('/login')} className="btn btn-primary" type="submit">Sign up</button>
      </form>
    </div>
  );
}
export default Signup; 



