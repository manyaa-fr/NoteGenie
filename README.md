NoteGenie 🧠 - AI Study Notes Summarizer
A clean, beautiful, and efficient AI-powered web application that transforms study materials into concise summaries with bullet points, definitions, and optional quiz questions.

✨ Features
Smart Summarization: AI-powered content analysis using Google Gemini API
Clean UI: Minimalistic design with dark/light mode toggle
Interactive Elements: Loading animations, hover effects, and smooth transitions
Responsive Design: Works perfectly on desktop, tablet, and mobile devices
Quiz Generation: Optional Q&A format for better retention
Copy to Clipboard: Easy sharing and saving of summaries
Sample Content: Pre-loaded example for quick testing
🛠️ Tech Stack
Frontend: React + Vite
Backend: Express.js + Node.js
AI Integration: Google Gemini 2.0 Flash API
Styling: Vanilla CSS with CSS custom properties
Deployment: Ready for Vercel, Replit, or any hosting platform
🚀 Quick Start
1. Clone and Install
bash
git clone <your-repo-url>
cd notegenie
npm install
2. Environment Setup
Create a .env file in the root directory:

bash
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
3. Get Your Gemini API Key
Go to Google AI Studio
Create a new API key
Copy and paste it into your .env file
4. Development
Run both frontend and backend:

bash
# Terminal 1 - Backend
node server.js

# Terminal 2 - Frontend  
npm run dev
Visit http://localhost:3000 to use the app!

5. Production Build
bash
npm run build
📁 Project Structure
notegenie/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── InputSection.jsx
│   │   ├── OutputSection.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── LoadingSpinner.jsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── InputSection.css
│   │   ├── OutputSection.css
│   │   ├── ThemeToggle.css
│   │   └── LoadingSpinner.css
│   ├── App.jsx
│   └── main.jsx
├── server.js
├── package.json
├── vite.config.js
└── index.html
🎯 How It Works
Input: Paste your study materials (up to 5000 characters)
Configure: Toggle quiz questions on/off
Process: AI analyzes and summarizes the content
Output: Get formatted summaries with:
🌿 Bullet Point Summary
📘 Key Definitions
📝 Quiz Questions (optional)
🎨 Design Features
Gradient Headers: Eye-catching background animations
Smooth Animations: Loading spinners, hover effects, and transitions
Dark Mode: Complete theme switching with system preference detection
Responsive Layout: Mobile-first design approach
Accessibility: Proper focus states and semantic HTML
🚀 Deployment Options
Vercel (Recommended)
Connect your GitHub repository
Add environment variables in Vercel dashboard
Deploy automatically
Replit
Import from GitHub
Add secrets for environment variables
Run with npm run dev
Traditional Hosting
Build with npm run build
Serve the dist folder
Deploy backend separately
🔧 Configuration
API Integration
The app uses Google Gemini 2.0 Flash API with these settings:

Temperature: 0.7 (balanced creativity)
Max Tokens: 2048 (comprehensive summaries)
Top K: 40, Top P: 0.95 (quality filtering)
Customization
Modify prompts in server.js
Adjust colors in CSS custom properties
Change character limits in components
📱 Mobile Support
Fully responsive design with:

Touch-friendly interfaces
Optimized typography
Adaptive layouts
Mobile-specific animations
🔒 Security
API keys stored server-side only
Input validation and sanitization
CORS protection
Rate limiting ready
🐛 Troubleshooting
API Issues:

Verify your Gemini API key
Check network connectivity
Monitor API usage limits
Build Issues:

Clear node_modules and reinstall
Check Node.js version (16+ recommended)
Verify all dependencies
📄 License
MIT License - feel free to use for personal and commercial projects!

🤝 Contributing
Fork the repository
Create a feature branch
Make your changes
Submit a pull request
Happy Studying! 🎓✨

