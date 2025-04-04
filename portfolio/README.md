# Personal Portfolio with Chatbot

## Overview
This is a responsive personal portfolio website with an integrated chatbot assistant. The portfolio showcases professional information including introduction, skills, resume, and contact details, while the chatbot provides an interactive way for visitors to learn more about the portfolio owner.

## Features
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Interactive Sections**:
  - Introduction: Brief personal overview
  - Skills: Highlighting technical abilities (Data and DevOps)
  - Resume: Professional experience with downloadable resume
  - Contact: Social media and email links
- **Interactive Chatbot**: Answers questions about skills, experience, and more

## Command for running the website server
-"npx --yes http-server".

## Technologies Used
- HTML5
- CSS3 (with responsive design)
- JavaScript (vanilla JS for chatbot functionality)
- Font Awesome for icons

## How to Use
1. Open `index.html` in any modern web browser
2. Navigate through different sections using the menu
3. Click the chat icon in the bottom right to interact with the chatbot
4. Use the contact links to connect via LinkedIn, GitHub, or email

## Chatbot Functionality
The chatbot can answer questions about:
- Skills and expertise
- Work experience
- Education background
- Contact information
- Resume details

## Chatbot Integration
This portfolio now includes an integrated chatbot powered by Together AI's API. The chatbot can answer questions about the portfolio owner's skills, education, projects, achievements, and contact information.

### Setup Instructions
1. Sign up for a Together AI account at https://together.ai/
2. Get your API key from the Together AI dashboard
3. Replace `YOUR_TOGETHER_API_KEY` in script.js with your actual API key
> Note: If no API key is provided, the chatbot will fall back to a local response system that still provides accurate information based on the resume data.

## Future Improvements
- Add a projects gallery section
- Implement form functionality for direct contact
- Add animations for better user experience

## License
This project is available for personal and educational use.
