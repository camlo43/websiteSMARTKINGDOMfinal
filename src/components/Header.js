import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../SmartKingdomfinal.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    setMenuOpen(false);
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
        {!user ? (
          <Link to="/login" className="navLink loginLink" aria-label="Login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        ) : (
          <button className="loginButton" onClick={handleLogout} aria-label="Logout">
            Logout
          </button>
        )}
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
