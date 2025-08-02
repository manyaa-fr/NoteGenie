import React from 'react';
import '../styles/ThemeToggle.css';

function ThemeToggle({ darkMode, toggleTheme }) {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <span className="theme-icon">
        {darkMode ? '☀️' : '🌙'}
      </span>
      <span className="theme-text">
        {darkMode ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}

export default ThemeToggle;