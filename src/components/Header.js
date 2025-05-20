import React, { useState } from 'react';
import logo from '../SmartKingdomfinal.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header className="header">
      <div className="titleContainer">
        <img src={logo} alt="Smart Kingdom Logo" className="logo" />
        <h1 className="title">Smart Kingdom</h1>
      </div>
      <nav className={`nav ${menuOpen ? 'navOpen' : ''}`}>
        {['grades', 'teachers', 'services', 'photos', 'inscripcion', 'location'].map((sectionId) => {
          const labels = {
            grades: 'Grados',
            teachers: 'Docentes',
            services: 'Servicios',
            photos: 'Fotos',
            inscripcion: 'Inscripción y horarios',
            location: 'Ubicación',
          };
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
        })}
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
