# NoteGenie 🧠 - AI Study Notes Summarizer

A beautiful and intelligent web application that uses Google's Generative AI (Gemini Pro) to transform your study materials into clear, structured summaries with bullet points, definitions, and optional quiz questions.

![NoteGenie Preview](https://img.shields.io/badge/Status-Ready-green) ![License](https://img.shields.io/badge/License-MIT-blue) ![Google AI](https://img.shields.io/badge/Google-Gemini--Pro-purple)

## ✨ Features

- **🤖 AI-Powered Summarization**: Uses Google's Gemini Pro for intelligent content analysis
- **📝 Structured Output**: Generates organized summaries with bullet points, definitions, and Q&A
- **🌙 Dark/Light Theme**: Toggle between beautiful themes with persistent preference
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **💾 Local Storage**: API key and theme preferences saved locally
- **📤 Export Options**: Download summaries as text files or copy to clipboard
- **⚡ Real-time Feedback**: Character counter, loading animations, and notifications
- **🔒 Secure**: API key stored locally, never sent to external servers

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Google AI API key (already configured in the app)

### Local Development

1. **Clone or download the project**
   ```bash
   git clone https://github.com/manyaa-fr/NoteGenie.git
   cd notegenie
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **API Key Ready**
   - Your Google AI API key is already configured
   - No additional setup required

4. **Start summarizing!**
   - Paste your study material in the input area
   - Toggle Q&A generation if desired
   - Click "Generate Summary" and watch the magic happen

## 📋 Usage Examples

### Example Input
```
Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy stored in glucose and other organic compounds. This process occurs in the chloroplasts of plant cells, specifically in the thylakoid membranes where chlorophyll molecules absorb light energy. The overall chemical equation for photosynthesis is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This process is essential for life on Earth as it provides oxygen for respiration and serves as the foundation of the food chain.
```

### Example Output
```
🌿 Summary:
• Plants convert sunlight into chemical energy through photosynthesis
• The process occurs in chloroplasts within plant cells
• Chlorophyll molecules in thylakoid membranes capture light energy
• Chemical equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂
• Photosynthesis is fundamental to Earth's food chain and oxygen production

📘 Definitions:
• Photosynthesis: The process by which plants convert light energy into chemical energy
• Chloroplasts: Organelles in plant cells where photosynthesis occurs
• Chlorophyll: Green pigment that absorbs light energy
• Thylakoid membranes: Structures within chloroplasts where light reactions occur

📝 Quiz Questions:
Q: What is the main purpose of photosynthesis?
A: To convert light energy into chemical energy stored in glucose.

Q: Where does photosynthesis occur in plant cells?
A: In the chloroplasts, specifically in the thylakoid membranes.

Q: What are the inputs and outputs of photosynthesis?
A: Inputs: CO₂, H₂O, and light energy. Outputs: Glucose (C₆H₁₂O₆) and oxygen (O₂).
```

## 🛠️ Technical Details

### Tech Stack
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **AI Backend**: Google Generative AI (Gemini Pro) API
- **Styling**: Custom CSS with CSS Variables for theming
- **Icons**: Font Awesome 6.0
- **Storage**: Local Storage for preferences

### File Structure
```
notegenie/
├── index.html          # Main HTML file
├── style.css           # Styles and theming
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/             # Optional assets folder
```

### API Configuration
- **Model**: Gemini Pro
- **Max Output Tokens**: 1000
- **Temperature**: 0.7 (balanced creativity and accuracy)
- **System Prompt**: Optimized for educational content summarization

## 🌐 Deployment

### Option 1: GitHub Pages (Free)
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select source branch (usually `main`)
4. Your app will be available at `https://username.github.io/repository-name`

### Option 2: Netlify (Free)
1. Drag and drop the project folder to [netlify.com](https://netlify.com)
2. Your app will be deployed instantly with a custom URL

### Option 3: Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Option 4: Replit (Free)
1. Create a new Repl
2. Upload the project files
3. Run the project

## 🔧 Customization

### Changing the AI Model
Edit the `callOpenAI` function in `script.js`:
```javascript
model: 'gpt-4', // Change to gpt-4 for better results (requires API access)
```

### Modifying the Prompt
Edit the `buildPrompt` function in `script.js` to customize the AI's behavior:
```javascript
let prompt = `Your custom prompt here...`;
```

### Adding New Themes
Add new theme variables in `style.css`:
```css
[data-theme="custom"] {
    --bg-primary: #your-color;
    --text-primary: #your-color;
    /* ... other variables */
}
```

## 🐛 Troubleshooting

### Common Issues

**"Error generating summary"**
- Check your OpenAI API key is correct
- Ensure you have sufficient API credits
- Verify your internet connection

**"API key not working"**
- Make sure the key starts with `sk-`
- Check if the key has the necessary permissions
- Try regenerating the key in OpenAI dashboard

**App not loading properly**
- Clear browser cache and reload
- Check browser console for JavaScript errors
- Ensure all files are in the same directory

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📈 Performance Tips

- Keep input under 5000 characters for optimal performance
- Use the Q&A toggle only when needed to save API tokens
- Clear browser cache regularly for smooth operation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Font Awesome for the beautiful icons
- The open-source community for inspiration

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Ensure you're using a supported browser

---

**Made with ❤️ for students and learners everywhere**

*NoteGenie - Making studying smarter, one summary at a time! 🧠✨* 