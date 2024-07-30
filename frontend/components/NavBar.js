import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ currentUser, logout }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/companies">Companies</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        {currentUser ? (
          <>
            <li><span>Welcome, {currentUser.username}</span></li>
            <li><Link to="/" onClick={logout}>Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
