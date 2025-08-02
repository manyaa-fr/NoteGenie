import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">
          <span className="title-text">NoteGenie</span>
          <span className="title-emoji">🧠</span>
        </h1>
        <p className="subtitle">AI-powered study notes summarizer</p>
      </div>
    </header>
  );
}

export default Header;