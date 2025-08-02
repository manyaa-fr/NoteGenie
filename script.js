// NoteGenie - AI Study Notes Summarizer
class NoteGenie {
    constructor() {
        this.apiKey = 'AIzaSyCsvK5NA1xqnhAyhQ16yMk3uN4qIQdU6pg'; // Your Google API key
        this.isDarkMode = localStorage.getItem('dark_mode') === 'true';
        this.currentSummary = '';
        
        this.initializeElements();
        this.setupEventListeners();
        this.applyTheme();
    }

    initializeElements() {
        console.log('Initializing elements...');
        
        // Main elements
        this.studyInput = document.getElementById('studyInput');
        this.charCount = document.getElementById('charCount');
        this.clearBtn = document.getElementById('clearBtn');
        this.summarizeBtn = document.getElementById('summarizeBtn');
        this.includeQA = document.getElementById('includeQA');
        this.outputContainer = document.getElementById('outputContainer');
        this.outputActions = document.getElementById('outputActions');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.copyBtn = document.getElementById('copyBtn');
        
        // Theme and loading
        this.themeToggle = document.getElementById('themeToggle');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        
        // Check if all required elements are found
        const requiredElements = [
            'studyInput', 'charCount', 'clearBtn', 'summarizeBtn', 
            'includeQA', 'outputContainer', 'outputActions', 
            'downloadBtn', 'copyBtn', 'themeToggle', 'loadingOverlay'
        ];
        
        const missingElements = requiredElements.filter(id => !document.getElementById(id));
        if (missingElements.length > 0) {
            console.error('Missing elements:', missingElements);
        } else {
            console.log('All elements found successfully!');
        }
        
        // API key is now hardcoded
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Check each element and log status
        console.log('studyInput:', this.studyInput);
        console.log('clearBtn:', this.clearBtn);
        console.log('summarizeBtn:', this.summarizeBtn);
        console.log('themeToggle:', this.themeToggle);
        console.log('downloadBtn:', this.downloadBtn);
        console.log('copyBtn:', this.copyBtn);
        
        // Add event listeners only if elements exist
        if (this.studyInput) {
            this.studyInput.addEventListener('input', () => this.updateCharCount());
            console.log('Added input event listener');
        }
        
        if (this.clearBtn) {
            this.clearBtn.addEventListener('click', () => this.clearInput());
            console.log('Added clear button event listener');
        }
        
        if (this.summarizeBtn) {
            this.summarizeBtn.addEventListener('click', () => {
                console.log('Generate Summary button clicked!');
                this.generateSummary();
            });
            console.log('Added summarize button event listener');
        }
        
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
            console.log('Added theme toggle event listener');
        }
        
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', () => this.downloadSummary());
            console.log('Added download button event listener');
        }
        
        if (this.copyBtn) {
            this.copyBtn.addEventListener('click', () => this.copySummary());
            console.log('Added copy button event listener');
        }
        
        // Initialize character count if studyInput exists
        if (this.studyInput) {
            this.updateCharCount();
        }
        
        console.log('Event listeners setup complete');
    }

    updateCharCount() {
        const count = this.studyInput.value.length;
        this.charCount.textContent = `${count} / 5000`;
        
        // Update character count color based on limit
        if (count > 4500) {
            this.charCount.style.color = 'var(--error-color)';
        } else if (count > 4000) {
            this.charCount.style.color = 'var(--warning-color)';
        } else {
            this.charCount.style.color = 'var(--text-secondary)';
        }
    }

    clearInput() {
        this.studyInput.value = '';
        this.updateCharCount();
        this.showPlaceholder();
    }

    // API key is now hardcoded with your Google API key

    async generateSummary() {
        const input = this.studyInput.value.trim();
        
        if (!input) {
            this.showNotification('Please enter some study material to summarize.', 'warning');
            return;
        }

        // API key is already set with your Google API key

        if (input.length > 5000) {
            this.showNotification('Input is too long. Please keep it under 5000 characters.', 'error');
            return;
        }

        this.showLoading();
        this.summarizeBtn.disabled = true;

        try {
            const includeQA = this.includeQA.checked;
            const summary = await this.callOpenAI(input, includeQA);
            this.displaySummary(summary);
            this.showNotification('Summary generated successfully!', 'success');
        } catch (error) {
            console.error('Error generating summary:', error);
            this.showNotification('Error generating summary. Please try again.', 'error');
        } finally {
            this.hideLoading();
            this.summarizeBtn.disabled = false;
        }
    }

    async callOpenAI(input, includeQA) {
        const systemPrompt = 'You are a helpful study assistant that creates clear, concise summaries of educational content. Always format your responses with clear sections and use bullet points for better readability.';
        const userPrompt = this.buildPrompt(input, includeQA);
        const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`;
        
        console.log('Making API call to:', API_URL);
        console.log('API Key:', this.apiKey);
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: fullPrompt
                            }
                        ]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7
                }
            })
        });

        if (!response.ok) {
            let errorMessage = 'Failed to generate summary';
            try {
                const errorData = await response.json();
                errorMessage = errorData.error?.message || errorMessage;
            } catch (e) {
                // If response is not JSON, get text instead
                const errorText = await response.text();
                errorMessage = `API Error (${response.status}): ${errorText}`;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        
        // Check if the response has the expected structure
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            throw new Error('Unexpected response format from Google AI API');
        }
        
        return data.candidates[0].content.parts[0].text;
    }

    buildPrompt(input, includeQA) {
        let prompt = `Summarize the following study content into a well-structured format with these sections:

🌿 Summary:
- Create 3-5 key bullet points covering the main concepts

📘 Definitions:
- Extract and define any important terms or concepts mentioned

${includeQA ? `
📝 Quiz Questions:
- Generate 2-3 relevant quiz questions with answers based on the content` : ''}

Please format the response clearly with emojis and proper spacing. Focus on making it easy to study and understand.

Study content:
${input}`;

        return prompt;
    }

    displaySummary(summary) {
        this.currentSummary = summary;
        
        // Format the summary with proper HTML
        const formattedSummary = this.formatSummary(summary);
        
        this.outputContainer.innerHTML = `
            <div class="summary-content fade-in">
                ${formattedSummary}
            </div>
        `;
        
        this.outputActions.style.display = 'flex';
    }

    formatSummary(summary) {
        // Convert markdown-like formatting to HTML
        let formatted = summary
            // Convert section headers
            .replace(/^🌿 Summary:/gm, '<h3>🌿 Summary:</h3>')
            .replace(/^📘 Definitions:/gm, '<h3>📘 Definitions:</h3>')
            .replace(/^📝 Quiz Questions:/gm, '<h3>📝 Quiz Questions:</h3>')
            
            // Convert bullet points
            .replace(/^- (.+)$/gm, '<li>$1</li>')
            
            // Convert Q&A format
            .replace(/Q: (.+?)\nA: (.+?)(?=\n\n|\nQ:|$)/gs, 
                '<div class="qa-item"><div class="qa-question">Q: $1</div><div class="qa-answer">A: $2</div></div>')
            
            // Wrap bullet points in ul tags
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            
            // Add section wrappers
            .replace(/(<h3>.*<\/h3>)/g, '<div class="summary-section">$1')
            .replace(/(<\/ul>|<\/div>)(?=\n<h3>|$)/g, '$1</div>');
        
        return formatted;
    }

    showPlaceholder() {
        this.outputContainer.innerHTML = `
            <div class="placeholder">
                <i class="fas fa-lightbulb"></i>
                <p>Your AI-generated summary will appear here...</p>
            </div>
        `;
        this.outputActions.style.display = 'none';
    }

    downloadSummary() {
        if (!this.currentSummary) return;
        
        const blob = new Blob([this.currentSummary], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `notegenie-summary-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Summary downloaded successfully!', 'success');
    }

    async copySummary() {
        if (!this.currentSummary) return;
        
        try {
            await navigator.clipboard.writeText(this.currentSummary);
            this.showNotification('Summary copied to clipboard!', 'success');
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = this.currentSummary;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Summary copied to clipboard!', 'success');
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('dark_mode', this.isDarkMode);
        this.applyTheme();
    }

    applyTheme() {
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    showLoading() {
        this.loadingOverlay.classList.add('active');
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('active');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-primary);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border-color);
            border-left: 4px solid var(--${type === 'success' ? 'success' : type === 'error' ? 'error' : 'warning'}-color);
            z-index: 1002;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }
}

// Initialize immediately since script is loaded after window.load
console.log('Script loaded, checking elements...');
const requiredElements = [
    'studyInput', 'charCount', 'clearBtn', 'summarizeBtn', 
    'includeQA', 'outputContainer', 'outputActions', 
    'downloadBtn', 'copyBtn', 'themeToggle', 'loadingOverlay'
];

const missingElements = requiredElements.filter(id => !document.getElementById(id));
if (missingElements.length > 0) {
    console.error('Missing elements:', missingElements);
} else {
    console.log('All elements found, initializing NoteGenie...');
    window.noteGenie = new NoteGenie(); // Make it globally accessible for testing
} 