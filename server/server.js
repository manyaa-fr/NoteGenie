const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://note-genie-plum.vercel.app',
    'https://notegenie-01yq.onrender.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Your Gemini API Key - Add this to your .env file
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/api/summarize', async (req, res) => {
  try {
    console.log('Received summarization request');
    const { text, includeQuiz } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text input is required' });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'API key not configured. Please set GEMINI_API_KEY environment variable.' 
      });
    }

    const prompt = createPrompt(text, includeQuiz);
    console.log('Calling Gemini API...');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }
    
    const summary = data.candidates[0].content.parts[0].text;
    console.log('Summary generated successfully');

    res.json({ summary });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary',
      details: error.message 
    });
  }
});

function createPrompt(text, includeQuiz) {
  let prompt = `Analyze and summarize the following study content. Please format your response exactly as shown below:

🌿 SUMMARY:
[Provide 4-6 clear bullet points covering the main concepts]

📘 DEFINITIONS:
[List any important terms and their definitions found in the text]

${includeQuiz ? `📝 QUIZ:
[Create 3-4 quiz questions with answers based on the content]

` : ''}Please ensure the response is well-formatted and educational. Here is the content to summarize:

${text}`;

  return prompt;
}

app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'NoteGenie API Server',
    status: 'running',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});