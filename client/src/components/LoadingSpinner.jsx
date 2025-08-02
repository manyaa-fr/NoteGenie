import React from 'react';
import '../styles/LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="spinner">
          <div className="brain-icon">🧠</div>
        </div>
        <p className="loading-text">AI is analyzing your notes...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;