import { useState } from 'react';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const notyf = new Notyf();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res.access) {
      localStorage.setItem('token', res.access);
      notyf.success('Logged in');
      navigate('/');
    } else {
      notyf.error(res.error || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-light">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-light">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
