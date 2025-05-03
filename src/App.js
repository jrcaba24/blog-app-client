// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import UserProfile from './pages/UserProfile';
import { UserProvider } from './UserContext';
import NotyfContext from './NotyfContext';


function App() {
  const [user, setUser] = useState(null);

  return (
    <UserProvider value={{ user, setUser }}>
      <NotyfContext.Provider value={new Notyf()}>
        <Router>
          <AppNavbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </div>
        </Router>
      </NotyfContext.Provider>
    </UserProvider>
  );
}

export default App;
