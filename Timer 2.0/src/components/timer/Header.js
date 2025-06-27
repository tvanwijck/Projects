import React from 'react';
import darkModeToggle from '../../Assets/dark_mode_toggle.png';
import lightModeToggle from '../../Assets/light_mode_toggle.png';
import monkeyIcon from '../../Assets/monkey.png';

const Header = ({ user, onLogout, darkMode, onToggleDarkMode, onMonkeyTrigger }) => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-left">
          <div className="user-welcome-container">
            <span className="user-name">Welcome, {user?.username}!</span>
            <button className="header-logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
          <h1 className="header-title" id="header-title">Time your time</h1>
        </div>
        <div className="header-right">
          <span className="dark-mode-icon-wrapper" data-tooltip={darkMode ? "Turn on the light" : "Turn off the light"}>
            <img 
              src={darkMode ? lightModeToggle : darkModeToggle} 
              id="dark-mode-toggle" 
              className="dark-mode-icon" 
              alt="Toggle dark mode" 
              onClick={onToggleDarkMode}
            />
          </span>
          <span className="monkey-icon-wrapper" data-tooltip="Monkey Time!">
            <img 
              src={monkeyIcon} 
              id="monkey-trigger" 
              className="monkey-icon" 
              alt="Monkey icon" 
              onClick={onMonkeyTrigger}
            />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header; 