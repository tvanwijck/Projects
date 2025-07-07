import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <span>© 2025 Timer App. All rights reserved.</span>
        </div>
        <div className="footer-links">
          <a 
            href="https://portfoliowiptest.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="portfolio-link"
          >
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 