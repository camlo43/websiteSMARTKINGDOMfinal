import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="socialButtons">
        <a href="https://www.instagram.com/smartkingdompreschool/" target="_blank" rel="noopener noreferrer" className="button" aria-label="Instagram">
          📸 Instagram
        </a>
        <a href="https://wa.me/3104396992" target="_blank" rel="noopener noreferrer" className="button" aria-label="WhatsApp">
          💬 WhatsApp
        </a>
      </div>
      <p>© 2024 Smart Kingdom - Un lugar feliz para aprender y crecer</p>
    </footer>
  );
};

export default Footer;
