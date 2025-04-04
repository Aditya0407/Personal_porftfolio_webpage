// DOM Elements
const chatIcon = document.getElementById('chat-icon');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChat = document.getElementById('close-chat');
const userInput = document.getElementById('user-input');
const sendMessage = document.getElementById('send-message');
const chatbotMessages = document.getElementById('chatbot-messages');

// Toggle chatbot window
chatIcon.addEventListener('click', () => {
    chatbotWindow.style.display = 'block';
});

closeChat.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
});

// Resume data for the chatbot to reference
const resumeData = {
    name: "Perumallapalli Srinivasa Aditya",
    education: [
        {
            degree: "B.Tech. in Computer Science and Engineering",
            institution: "Indian Institute of Technology, Roorkee",
            period: "2022 - Present",
            details: "CGPA: 7.426"
        },
        {
            degree: "Intermediate (Class XII)",
            institution: "Sri Chaitanya Boys Jr college, Vijayawada",
            period: "2020 - 2022",
            details: "Percentage: 97.80%"
        },
        {
            degree: "Matriculate (Class X)",
            institution: "Dr.KKR Gowtam Educational Institutions, Gudiwada",
            period: "2020",
            details: "Percentage: 98.10%"
        }
    ],
    skills: {
        programming: ["C++", "Python", "Java", "Dart"],
        development: ["App Development (Flutter)", "Web Development", "Data Structures and Algorithms", "Firebase", "Django"],
        other: ["VS Code", "Competitive Programming", "Languages: English (SRW), Telugu (SRW)"]
    },
    projects: [
        {
            name: "FitPal",
            organization: "Indian Institute of Technology, Roorkee",
            period: "March 2024 - April 2024",
            description: "A personalized fitness mobile app designed to help users achieve their optimal BMI by tailoring their fitness experience based on personal data such as height and weight. Implemented using Flutter framework (in Dart) and Firebase for the backend."
        },
        {
            name: "RISC-V Assembler, 5 stage pipeline, Cache simulator",
            organization: "Indian Institute of Technology, Roorkee",
            period: "August 2023 - November 2023",
            description: "Transformed assembly-level code written in RISC-V into machine-level binary code and simulated its execution in a pipelined process. Implemented a simulation of a write-back, write-no-allocate cache with an LRU replacement policy in C++."
        },
        {
            name: "SIC/XE Assembler",
            organization: "Indian Institute of Technology, Roorkee",
            period: "March 2024 - April 2024",
            description: "Developed a program that takes in an SIC/XE assembly language program as input and converts it into a listing file and object program. Implemented in C++."
        },
        {
            name: "HTR: Handwritten to digital text",
            organization: "Indian Institute of Technology, Roorkee",
            period: "September 2023 - November 2023",
            description: "Built an application to convert handwritten text from images to digital text. Features include taking images from gallery and smart grammar suggestions. Built with Flutter, Django, Python, and SQLite."
        }
    ],
    achievements: [
        "Secured All India Rank 4574 in Joint Entrance Examination Advance B.Tech 2022.",
        "Secured a global rank of 1662 in Educational Codeforces Round 161 (Div2).",
        "Secured a state wide rank of 247 in Andhra Pradesh EAPCET 2022.",
        "Secured a state wide rank of 402 in Telangana EAMCET 2022.",
        "Secured All India Rank 3085 in Joint Entrance Examination Mains B.Tech 2022."
    ],
    responsibilities: [
        {
            position: "NCC",
            organization: "Indian Institute of Technology Roorkee",
            period: "October 2022 - April 2023",
            description: "Volunteered in various Institute programs in campus as cadet."
        },
        {
            position: "Competitive Programming",
            organization: "Online judges",
            period: "February 2024 - June 2024",
            description: "An active member in Codeforces by the handle 'Aditya_0703'. A rating of 1289(pupil) in Codeforces(highest rating)."
        }
    ],
    contact: {
        email: "perumallapalli_sa@cs.iitr.ac.in",
        phone: "6305283927",
        codeforces: "https://codeforces.com/profile/Aditya_0703"
    }
};

// Together AI API integration
const TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions";
const TOGETHER_API_KEY = "YOUR_TOGETHER_API_KEY"; // Replace with your actual API key

// Send message function
function sendUserMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input field
    userInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get bot response
    getBotResponse(message);
}

// Event listeners for sending messages
sendMessage.addEventListener('click', sendUserMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
});

// Add message to chat
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    messageElement.appendChild(messageText);
    chatbotMessages.appendChild(messageElement);
    
    // Scroll to bottom of chat
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('message', 'bot-message', 'typing-indicator');
    typingElement.innerHTML = '<span></span><span></span><span></span>';
    typingElement.id = 'typing-indicator';
    chatbotMessages.appendChild(typingElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Get bot response using Together AI API
async function getBotResponse(message) {
    try {
        // If API key is not set, fall back to local responses
        if (TOGETHER_API_KEY === "YOUR_TOGETHER_API_KEY") {
            getFallbackResponse(message);
            return;
        }
        
        const response = await fetch(TOGETHER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOGETHER_API_KEY}`
            },
            body: JSON.stringify({
                model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
                messages: [
                    {
                        role: "system",
                        content: `You are a helpful portfolio assistant for ${resumeData.name}. You have access to their resume information and can answer questions about their education, skills, projects, achievements, and contact information. Be concise, friendly, and informative. Only answer questions related to the resume data provided. If asked about something not in the resume, politely state that you don't have that information.`
                    },
                    {
                        role: "user",
                        content: `Here is the resume data: ${JSON.stringify(resumeData)}`
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                temperature: 0.7,
                max_tokens: 150
            })
        });

        const data = await response.json();
        removeTypingIndicator();
        
        if (data.choices && data.choices.length > 0) {
            const botResponse = data.choices[0].message.content;
            addMessage(botResponse, 'bot');
        } else {
            // Fallback if API response is not as expected
            addMessage("I'm having trouble connecting to my knowledge base. Let me try a simpler response.", 'bot');
            getFallbackResponse(message);
        }
    } catch (error) {
        console.error("Error calling Together AI API:", error);
        removeTypingIndicator();
        addMessage("I'm having trouble connecting right now. Let me try a simpler response.", 'bot');
        getFallbackResponse(message);
    }
}

// Fallback responses based on keywords (used when API is unavailable)
function getFallbackResponse(message) {
    // Convert message to lowercase for easier matching
    const lowerMessage = message.toLowerCase();
    
    // Simulate typing delay
    setTimeout(() => {
        removeTypingIndicator();
        let response;
        
        // Check for keywords and provide appropriate responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            response = `Hello! I'm ${resumeData.name}'s portfolio assistant. How can I help you today?`;
        } 
        else if (lowerMessage.includes('skills') || lowerMessage.includes('what can you do')) {
            response = `${resumeData.name} is skilled in programming languages like ${resumeData.skills.programming.join(', ')}, and development skills including ${resumeData.skills.development.join(', ')}.`;
        }
        else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
            response = `${resumeData.name} has worked on several projects including: ${resumeData.projects.map(p => p.name).join(', ')}. Ask about a specific project for more details!`;
        }
        else if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('study')) {
            response = `${resumeData.name} is pursuing B.Tech in Computer Science and Engineering at IIT Roorkee (2022-Present) with a CGPA of 7.426.`;
        }
        else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            response = `You can contact ${resumeData.name} via email at ${resumeData.contact.email} or phone at ${resumeData.contact.phone}.`;
        }
        else if (lowerMessage.includes('achievement') || lowerMessage.includes('award') || lowerMessage.includes('rank')) {
            response = `${resumeData.name} has several achievements including securing AIR 4574 in JEE Advanced and a global rank of 1662 in Educational Codeforces Round 161.`;
        }
        else if (lowerMessage.includes('resume')) {
            response = "You can download the full resume from the Resume section of this portfolio.";
        }
        else if (lowerMessage.includes('thank')) {
            response = "You're welcome! Feel free to ask if you have any other questions about the portfolio.";
        }
        else if (lowerMessage.includes('fitpal') || lowerMessage.includes('fitness app')) {
            const project = resumeData.projects.find(p => p.name.toLowerCase().includes('fitpal'));
            response = `FitPal is ${project.description}`;
        }
        else if (lowerMessage.includes('risc') || lowerMessage.includes('assembler') || lowerMessage.includes('pipeline')) {
            const project = resumeData.projects.find(p => p.name.toLowerCase().includes('risc'));
            response = `The RISC-V project: ${project.description}`;
        }
        else if (lowerMessage.includes('htr') || lowerMessage.includes('handwritten')) {
            const project = resumeData.projects.find(p => p.name.toLowerCase().includes('htr'));
            response = `The HTR project: ${project.description}`;
        }
        else if (lowerMessage.includes('competitive') || lowerMessage.includes('codeforces')) {
            response = `${resumeData.name} is active in competitive programming with a Codeforces handle 'Aditya_0703' and a highest rating of 1289 (pupil).`;
        }
        else {
            response = `I'm not sure I understand. You can ask me about ${resumeData.name}'s education, skills, projects, achievements, or contact information.`;
        }
        
        addMessage(response, 'bot');
    }, 600);
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Add a sample resume PDF file
const resumeLink = document.querySelector('.download-resume a');
resumeLinkHref = resumeLink.getAttribute('href');

// If the resume file doesn't exist, show an alert when clicked
resumeLinkHref === 'resume.pdf' && resumeLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('This is a demo portfolio. In a real portfolio, this would download an actual resume PDF.');
});

// Initialize the chatbot with a welcome message
document.addEventListener('DOMContentLoaded', () => {
    // The initial message is already in the HTML
});