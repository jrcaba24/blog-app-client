import { useState } from 'react';
import { register } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const notyf = new Notyf();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", form); // Debug form values

    try {
      const res = await register(form);

      if (res.access) {
        localStorage.setItem('token', res.access);
        notyf.success('Registered successfully');
        navigate('/');
      } else {
        notyf.error(res.error || 'Registration failed');
      }
    } catch (err) {
      notyf.error('Something went wrong');
      console.error('Register error:', err);
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Enter username"
            onChange={handleChange}
            value={form.username}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleChange}
            value={form.email}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            value={form.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
