import React from 'react';
import '../styles/InputSection.css';

const SAMPLE_TEXT = `Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of carbon dioxide and water. This process occurs in the chloroplasts of plant cells, specifically in structures called thylakoids. The overall equation for photosynthesis is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Chlorophyll, the green pigment in plants, captures light energy and converts it into chemical energy. The process consists of two main stages: the light-dependent reactions (which occur in the thylakoids) and the light-independent reactions or Calvin cycle (which occur in the stroma). During the light-dependent reactions, water molecules are split, releasing oxygen as a byproduct. The Calvin cycle uses the energy from the light-dependent reactions to convert carbon dioxide into glucose.`;

function InputSection({ inputText, setInputText, includeQuiz, setIncludeQuiz, onSummarize, isLoading }) {
  const handleLoadSample = () => {
    setInputText(SAMPLE_TEXT);
  };

  const handleClear = () => {
    setInputText('');
  };

  return (
    <div className="input-section">
      <div className="section-header">
        <h2>📝 Input Your Study Material</h2>
        <div className="header-controls">
          <button 
            className="sample-btn"
            onClick={handleLoadSample}
            disabled={isLoading}
          >
            Load Sample
          </button>
          <button 
            className="clear-btn"
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear
          </button>
        </div>
      </div>
      
      <textarea
        className="input-textarea"
        placeholder="Paste your study content here (textbook paragraphs, lecture notes, etc.)..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
        maxLength={5000}
      />
      
      <div className="input-footer">
        <div className="char-counter">
          {inputText.length}/5000 characters
        </div>
        
        <div className="controls">
          <label className="quiz-toggle">
            <input
              type="checkbox"
              checked={includeQuiz}
              onChange={(e) => setIncludeQuiz(e.target.checked)}
              disabled={isLoading}
            />
            <span className="checkmark"></span>
            Include Quiz Questions
          </label>
          
          <button
            className="summarize-btn"
            onClick={onSummarize}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? 'Generating...' : '✨ Summarize'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputSection;