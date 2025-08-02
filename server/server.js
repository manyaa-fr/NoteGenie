const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://notegenie-01yq.onrender.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Your Gemini API Key - Add this to your .env file
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ;

app.post('/api/summarize', async (req, res) => {
  try {
    const { text, includeQuiz } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text input is required' });
    }

    const prompt = createPrompt(text, includeQuiz);
    
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
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const summary = data.candidates[0].content.parts[0].text;

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

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'NoteGenie API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint for Render health checks
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running!',
    message: 'NoteGenie Backend API',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}`);
});