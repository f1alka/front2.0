import React from 'react';

const Modal = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{title}</h2>
        <div className="modal-description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;