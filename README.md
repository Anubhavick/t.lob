# T.lob - AI-Powered Web Development Platform

> **Build full-stack applications instantly with AI** - A revolutionary web development platform that transforms natural language descriptions into complete, production-ready applications.

## Overview

T.lob is an intelligent web development platform that leverages cutting-edge AI models to generate complete web applications from simple text prompts. Whether you're building a React frontend, Node.js backend, or a full-stack application, T.lob handles the entire development workflow - from project scaffolding to code generation

## Key Features

### AI-Powered Code Generation
- **Natural Language to Code**: Describe your app in plain English, and watch as T.lob generates production-ready code
- **Multi-Model Support**: Integrated with GitHub AI Models (GPT-4o) for intelligent code generation
- **Context-Aware**: Understands project structure and generates code that fits seamlessly with existing files

### Smart Project Detection
- **Automatic Template Selection**: Intelligently detects whether you need a React, Node.js, or custom project
- **Pre-configured Templates**: 
  - **React Template**: Vite + React 18 + TypeScript + Tailwind CSS + Lucide Icons
  - **Node.js Template**: Express + TypeScript with modern best practices

### Advanced Architecture

#### WebContainer Integration (Concept)
T.lob is designed to work with WebContainer technology - an in-browser Node.js runtime that emulates a Linux-like environment:
- **Browser-Based Execution**: Run Node.js, npm, and shell commands directly in the browser
- **No Backend Required**: Full development environment without cloud infrastructure
- **Real-time Preview**: Instant feedback as code changes are applied
- **Sandboxed Environment**: Secure, isolated execution context

#### Artifact System
Inspired by modern AI development tools, T.lob uses a structured artifact system:
- **`<boltArtifact>`**: Container for complete project structures
- **`<boltAction>`**: Individual file operations (create, update, delete)
- **Sequential Execution**: Actions are executed in order for proper dependency management

### Technology Stack

#### Backend
```
├── Express.js          # RESTful API server
├── OpenAI SDK          # GitHub AI Models integration
├── TypeScript          # Type-safe development
└── Custom Prompts      # Engineered system prompts for optimal output
```

#### Frontend (Planned)
```
├── React 18            # Modern UI framework
├── TypeScript          # Type safety
├── Tailwind CSS        # Utility-first styling
├── Vite                # Lightning-fast build tool
└── Lucide React        # Beautiful icon library
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- GitHub Personal Access Token with AI model access

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Anubhavick/t.lob.git
cd t.lob
```

2. **Set up the backend**
```bash
cd backend
npm install
```

3. **Configure environment variables**
Create a `.env` file in the `backend` directory:
```env
GITHUB_TOKEN=your_github_personal_access_token_here
PORT=3000
```

4. **Start the development server**
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### POST `/template`
Analyzes the user's prompt and returns the appropriate project template.

**Request:**
```json
{
  "prompt": "Create a todo app with React"
}
```

**Response:**
```json
{
  "prompts": [
    "System prompt...",
    "Base template prompt..."
  ],
  "uiPrompts": [
    "Full React template with all files..."
  ]
}
```

### POST `/chat`
Processes chat messages and generates code based on the conversation.

**Request:**
```json
{
  "messages": [
    { "role": "system", "content": "System prompt..." },
    { "role": "user", "content": "Add a delete button to each todo item" }
  ]
}
```

**Response:**
```json
{
  "response": "<boltArtifact>...</boltArtifact>"
}
```

## How It Works

### 1. **Prompt Engineering**
T.lob uses sophisticated system prompts that guide the AI to:
- Generate clean, modular code following best practices
- Use the artifact format for structured output
- Consider the entire project context
- Split functionality into smaller, reusable modules
- Apply proper naming conventions and formatting

### 2. **Project Type Detection**
The `/template` endpoint uses AI to analyze the user's intent:
```typescript
// Detects project type: "react" or "node"
const response = await client.chat.completions.create({
  messages: [
    { role: 'system', content: "Detect project type..." },
    { role: 'user', content: userPrompt }
  ]
});
```

### 3. **Context Management**
To work within AI model token limits (4000 tokens for GPT-4o):
- Sends summarized base prompts to the AI
- Returns full templates separately for UI display
- Maintains conversation history efficiently

### 4. **Code Generation**
The AI generates structured artifacts:
```xml
<boltArtifact id="todo-app" title="Todo Application">
  <boltAction type="file" filePath="src/App.tsx">
    // Complete React component code
  </boltAction>
  <boltAction type="shell">
    npm install
  </boltAction>
</boltArtifact>
```

## Use Cases

- **Rapid Prototyping**: Turn ideas into working prototypes in minutes
- **Learning Tool**: See how experienced developers structure applications
- **Component Library**: Generate reusable UI components on demand
- **API Development**: Create Express endpoints and database schemas
- **Full-Stack Apps**: Build complete applications with frontend and backend

## Configuration

### AI Model Settings
Located in `backend/src/index.ts`:
```typescript
const endpoint = "https://models.github.ai/inference";
const model = "gpt-4o"; // or "gpt-4o-mini", "o1-preview"
```

### System Prompts
Customize AI behavior in `backend/src/prompts.ts`:
- Code style preferences
- Framework-specific guidelines
- Project structure conventions

### Templates
Modify base templates in `backend/src/defaults/`:
- `react.ts` - React + Vite template
- `node.ts` - Node.js template

## Best Practices

### Rate Limit Management
- GitHub AI models have daily rate limits
- Use keyword-based detection when possible
- Implement retry logic with exponential backoff
- Cache responses for repeated queries

### Token Optimization
- Summarize base prompts to fit within limits
- Stream responses for large outputs
- Maintain minimal conversation history

### Security
- Never commit `.env` files
- Validate all user inputs
- Sanitize AI-generated code before execution
- Use proper CORS configuration

## Roadmap

- [ ] **Frontend Interface**: Complete React UI with Monaco Editor
- [ ] **WebContainer Integration**: In-browser code execution
- [ ] **Live Preview**: Real-time application preview
- [ ] **Version Control**: Git-like version management for projects
- [ ] **Collaboration**: Multi-user editing and sharing
- [ ] **Template Marketplace**: Community-contributed templates
- [ ] **Custom Models**: Support for local and custom AI models
- [ ] **Export Options**: Download as zip, deploy to Vercel/Netlify

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- GitHub AI Models for providing the AI inference API
- OpenAI SDK for the excellent TypeScript client
- The React, Vite, and TypeScript communities
- WebContainer technology pioneers for the browser-based runtime concept

## Contact

**Anubhavick** - [@Anubhavick](https://github.com/Anubhavick)

Project Link: [https://github.com/Anubhavick/t.lob](https://github.com/Anubhavick/t.lob)

---

**Built with care using AI and modern web technologies** 
