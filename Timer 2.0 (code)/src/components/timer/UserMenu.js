import React, { useState } from 'react';

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="user-menu">
      <div className="user-info" onClick={() => setIsOpen(!isOpen)}>
        <span className="user-name">Welcome, {user?.username}!</span>
        <span className="user-dropdown">▼</span>
      </div>
      {isOpen && (
        <div className="user-dropdown-menu">
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 