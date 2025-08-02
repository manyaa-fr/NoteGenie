# NoteGenie 🧠 - AI Study Notes Summarizer

> Transform your study materials into clear, structured summaries with AI-powered bullet points, definitions, and quiz questions.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://reactjs.org/)
[![Google AI](https://img.shields.io/badge/Google-Gemini--Pro-purple.svg)](https://ai.google.dev/)

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🎯 Usage](#-usage)
- [🌐 Deployment](#-deployment)
- [📁 Project Structure](#-project-structure)
- [🔧 API Reference](#-api-reference)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🎯 Core Features
- **🤖 AI-Powered Summarization**: Uses Google's Gemini Pro for intelligent content analysis
- **📝 Structured Output**: Generates organized summaries with bullet points, definitions, and Q&A
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **⚡ Real-time Processing**: Fast AI-powered summarization with loading indicators
- **📤 Export Options**: Download summaries as text files or copy to clipboard
- **🎨 Modern UI**: Clean, intuitive interface with smooth animations

### 🌟 Additional Features
- **🌙 Dark/Light Theme**: Toggle between beautiful themes
- **📊 Character Counter**: Real-time input validation
- **🔄 Error Handling**: Comprehensive error management
- **📱 Mobile Optimized**: Touch-friendly interface

## 🛠️ Tech Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **Frontend** | React | 19.1.0 |
| **Build Tool** | Vite | 7.0.4 |
| **Backend** | Node.js + Express | 5.1.0 |
| **AI Service** | Google Generative AI (Gemini Pro) | Latest |
| **Styling** | CSS3 + CSS Variables | - |
| **Deployment** | Vercel/Replit Ready | - |

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Gemini API key**

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manyaa-fr/notegenie.git
   cd notegenie
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # In the server directory
   cp env.example .env
   ```

4. **Configure your API key**
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

### ⚙️ Configuration

#### Getting a Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key to your `.env` file

#### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key | ✅ | - |
| `PORT` | Server port number | ❌ | 5000 |
| `NODE_ENV` | Environment mode | ❌ | development |

### 🎯 Usage

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend client**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to use the application

## 📋 How to Use

### Step-by-Step Guide

1. **📝 Input Study Material**
   - Paste your study content in the text area
   - Support for up to 5000 characters
   - Real-time character counter

2. **⚙️ Configure Options**
   - Toggle "Include Q&A" for quiz questions
   - Choose between light/dark theme

3. **🚀 Generate Summary**
   - Click "Generate Summary" button
   - Watch the AI process your content
   - View loading indicators

4. **📖 Review Results**
   - Structured summary with bullet points
   - Important definitions extracted
   - Optional quiz questions (if enabled)

5. **📤 Export & Share**
   - Copy to clipboard
   - Download as text file
   - Share with classmates

### Example Input/Output

**Input:**
```
Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy stored in glucose and other organic compounds. This process occurs in the chloroplasts of plant cells, specifically in the thylakoid membranes where chlorophyll molecules absorb light energy.
```

**Output:**
```
🌿 SUMMARY:
• Plants convert sunlight into chemical energy through photosynthesis
• The process occurs in chloroplasts within plant cells
• Chlorophyll molecules in thylakoid membranes capture light energy
• Chemical equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂

📘 DEFINITIONS:
• Photosynthesis: The process by which plants convert light energy into chemical energy
• Chloroplasts: Organelles in plant cells where photosynthesis occurs
• Chlorophyll: Green pigment that absorbs light energy
• Thylakoid membranes: Structures within chloroplasts where light reactions occur

📝 QUIZ:
Q: What is the main purpose of photosynthesis?
A: To convert light energy into chemical energy stored in glucose.

Q: Where does photosynthesis occur in plant cells?
A: In the chloroplasts, specifically in the thylakoid membranes.
```

## 🌐 Deployment

### Deploy to Vercel

1. **Deploy Frontend**
   ```bash
   cd client
   npm run build
   # Deploy the dist folder to Vercel
   ```

2. **Deploy Backend**
   ```bash
   cd server
   # Deploy to Vercel with environment variables
   ```

3. **Configure Environment Variables**
   - Add `GEMINI_API_KEY` to Vercel environment variables
   - Set `NODE_ENV=production`

### Deploy to Replit

1. **Import Repository**
   - Create new Repl
   - Import from GitHub repository

2. **Set Environment Variables**
   - Add `GEMINI_API_KEY` to Replit secrets
   - Configure other variables as needed

3. **Configure Run Command**
   ```bash
   cd server && npm start
   ```

### Environment Variables for Production

```env
GEMINI_API_KEY=your_production_api_key
PORT=5000
NODE_ENV=production
```

## 📁 Project Structure

```
notegenie/
├── 📁 client/                    # React frontend
│   ├── 📁 src/
│   │   ├── 📁 components/        # React components
│   │   ├── 📁 styles/           # CSS stylesheets
│   │   ├── App.jsx              # Main application component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Base styles
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   └── index.html               # HTML template
├── 📁 server/                    # Express backend
│   ├── server.js                # Main server file
│   ├── package.json             # Backend dependencies
│   └── env.example              # Environment template
├── README.md                    # This file
├── vercel.json                  # Vercel deployment config
└── .gitignore                   # Git ignore rules
```

## 🔧 API Reference

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "Server is running!"
}
```

#### Generate Summary
```http
POST /api/summarize
```

**Request Body:**
```json
{
  "text": "Your study material here...",
  "includeQuiz": true
}
```

**Response:**
```json
{
  "summary": "Generated summary with bullet points and definitions...",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "inputLength": 150,
  "includeQuiz": true
}
```

### Error Responses

```json
{
  "error": "Error message",
  "details": "Additional error details"
}
```

## 🐛 Troubleshooting

### Common Issues

#### 1. API Key Errors
**Problem:** "Google API key is invalid or missing"
**Solution:**
- Verify your API key is correct
- Check that the key has proper permissions
- Ensure the key is in your `.env` file

#### 2. CORS Errors
**Problem:** Cross-origin request blocked
**Solution:**
- Server includes CORS middleware
- Ensure frontend is making requests to correct backend URL
- Check proxy configuration in `vite.config.js`

#### 3. Port Conflicts
**Problem:** Port 5000 already in use
**Solution:**
- Change PORT in `.env` file
- Update proxy configuration in `vite.config.js`
- Kill processes using the port

#### 4. Build Errors
**Problem:** Frontend build fails
**Solution:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for dependency conflicts
- Update to latest Node.js version

### Debug Mode

Enable debug logging:
```bash
NODE_ENV=development DEBUG=* npm run dev
```

### Performance Tips

- Keep input under 5000 characters for optimal performance
- Use Q&A toggle only when needed to save API tokens
- Clear browser cache regularly for smooth operation

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style

- Use consistent formatting
- Add comments for complex logic
- Follow existing naming conventions
- Test your changes before submitting

### Reporting Issues

When reporting issues, please include:
- Operating system and version
- Node.js version
- Browser version (if frontend issue)
- Steps to reproduce
- Expected vs actual behavior

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 NoteGenie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- **Google** for providing the Gemini AI API
- **React** and **Vite** teams for excellent development tools
- **Express.js** community for the robust backend framework
- **Open-source community** for inspiration and support

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/notegenie/issues)
- **Documentation**: Check this README and inline code comments
- **Community**: Join our discussions on GitHub

---

<div align="center">

**Made with ❤️ for students and learners everywhere**

*NoteGenie - Making studying smarter, one summary at a time! 🧠✨*

[⬆ Back to top](#notegenie---ai-study-notes-summarizer)

</div>

