import React from 'react';
import '../styles/OutputSection.css';

function OutputSection({ summary, error, isLoading }) {
  const formatSummary = (text) => {
    if (!text) return null;
    
    // Split the text into lines and process each line
    const lines = text.split('\n');
    const formattedLines = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;
      
      // Check for section headers (🌿 SUMMARY:, 📘 DEFINITIONS:, etc.)
      if (trimmedLine.match(/^[🌿📘📝].+:/)) {
        formattedLines.push(
          <h3 key={index} className="section-header">
            {trimmedLine}
          </h3>
        );
      }
      // Check for bullet points
      else if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
        formattedLines.push(
          <li key={index} className="bullet-point">
            {trimmedLine.substring(1).trim()}
          </li>
        );
      }
      // Check for questions (Q:)
      else if (trimmedLine.startsWith('Q:')) {
        formattedLines.push(
          <div key={index} className="question">
            <strong>{trimmedLine}</strong>
          </div>
        );
      }
      // Check for answers (A:)
      else if (trimmedLine.startsWith('A:')) {
        formattedLines.push(
          <div key={index} className="answer">
            {trimmedLine}
          </div>
        );
      }
      // Regular paragraph text
      else {
        formattedLines.push(
          <p key={index} className="regular-text">
            {trimmedLine}
          </p>
        );
      }
    });
    
    return formattedLines;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    // You could add a toast notification here
  };

  return (
    <div className="output-section">
      <div className="section-header">
        <h2>🎯 AI Summary</h2>
        {summary && (
          <button 
            className="copy-btn"
            onClick={copyToClipboard}
            title="Copy to clipboard"
          >
            📋 Copy
          </button>
        )}
      </div>
      
      <div className="output-content">
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
        
        {!summary && !error && !isLoading && (
          <div className="placeholder">
            <div className="placeholder-icon">🤖</div>
            <h3>Ready to summarize!</h3>
            <p>Enter your study material and click "Summarize" to get:</p>
            <ul className="feature-list">
              <li>• Clear bullet point summaries</li>
              <li>• Important definitions</li>
              <li>• Optional quiz questions</li>
            </ul>
          </div>
        )}
        
        {summary && (
          <div className="summary-output">
            {formatSummary(summary)}
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputSection;