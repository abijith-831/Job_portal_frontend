import React, { useState } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/logos/cmwlogo (1) 1.svg';
import JobModal from './JobModal';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <header className="header">
      <div className="navbar-pill">
        <img src={logo} alt="Logo" className="logo" />
        <nav>
          <a href="#">Home</a>
          <a href="#">Find Jobs</a>
          <a href="#">Find Talents</a>
          <a href="#">About us</a>
          <a href="#">Testimonials</a>
          <button className="create-btn" onClick={() => setIsModalOpen(true)}>
            <span className="btn-text btn-primary">Create Jobs</span>
            <span className="btn-text btn-secondary">Login</span>
          </button>

        </nav>
      </div>
      {isModalOpen && <JobModal onClose={() => setIsModalOpen(false)} />}
    </header>
  );
}

export default Navbar;
