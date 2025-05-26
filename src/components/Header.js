import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../SmartKingdomfinal.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // close menu on navigation
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const sections = ['grades', 'teachers', 'services', 'photos', 'inscripcion', 'location'];
  const labels = {
    grades: 'Grados',
    teachers: 'Docentes',
    services: 'Servicios',
    photos: 'Fotos',
    inscripcion: 'Inscripción y horarios',
    location: 'Ubicación',
  };

  return (
    <header className="header">
      <div className="titleContainer">
        <Link to="/" className="logoLink" aria-label="Go to Home">
          <img src={logo} alt="Smart Kingdom Logo" className="logo" />
        </Link>
        
      </div>
      <nav className={`nav ${menuOpen ? 'navOpen' : ''}`}>
        {sections.map((sectionId) => {
          if (location.pathname === '/') {
            // On home page, use scrollIntoView
            return (
              <span
                key={sectionId}
                onClick={() => handleScroll(sectionId)}
                className="navLink"
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#46a6fa'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleScroll(sectionId); }}
                aria-label={`Navigate to ${labels[sectionId]}`}
              >
                {labels[sectionId]}
              </span>
            );
          } else {
            // On other pages, use Link to home with hash
            return (
              <Link
                key={sectionId}
                to={`/#${sectionId}`}
                className="navLink"
                aria-label={`Navigate to ${labels[sectionId]}`}
                onClick={() => setMenuOpen(false)}
              >
                {labels[sectionId]}
              </Link>
            );
          }
        })}
        <Link to="/login" className="navLink loginLink" aria-label="Login" onClick={() => setMenuOpen(false)}>
          Login
        </Link>
      </nav>
      <button
        className="menuToggle"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </header>
  );
};

export default Header;
