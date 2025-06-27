import React from 'react';
import './CustomDialog.css';

const CustomDialog = ({ isOpen, title, message, buttons, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-dialog show" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>
        <div className="dialog-buttons">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`dialog-btn dialog-btn-${button.type}`}
              onClick={() => {
                button.onClick();
                onClose();
              }}
            >
              <span>{button.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomDialog; 