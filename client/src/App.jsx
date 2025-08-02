import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import ThemeToggle from './components/ThemeToggle';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [includeQuiz, setIncludeQuiz] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to summarize');
      return;
    }

    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      // Try different API endpoints
      let apiUrl = '/api/summarize';
      
      // Check if we're in development and backend might be on different port
      if (window.location.hostname === 'localhost') {
        // First try the proxy
        let response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: inputText,
            includeQuiz: includeQuiz
          }),
        }).catch(() => null);

        // If proxy fails, try direct backend connection
        if (!response || !response.ok) {
          apiUrl = 'http://localhost:5000/api/summarize';
          response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: inputText,
              includeQuiz: includeQuiz
            }),
          });
        }

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        setSummary(data.summary);
      } else {
        // Production environment - use deployed backend
        apiUrl = 'https://notegenie-01yq.onrender.com/api/summarize';
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: inputText,
            includeQuiz: includeQuiz
          }),
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        setSummary(data.summary);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(`Failed to generate summary: ${err.message}. Make sure the backend server is running on port 5000.`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Header />
      <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <div className="main-container">
        <div className="content-wrapper">
          <InputSection
            inputText={inputText}
            setInputText={setInputText}
            includeQuiz={includeQuiz}
            setIncludeQuiz={setIncludeQuiz}
            onSummarize={handleSummarize}
            isLoading={isLoading}
          />
          
          <OutputSection
            summary={summary}
            error={error}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      {isLoading && <LoadingSpinner />}
    </div>
  );
}

export default App;