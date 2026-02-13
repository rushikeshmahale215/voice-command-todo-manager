# Voice Command Todo Manager

A hands-free todo application where users can add, complete, and organize tasks using voice commands processed by an AI agent. Users interact with the application entirely through voice, making it ideal for hands-free productivity.

---

## Project Overview

### Description
The Voice Command Todo Manager combines voice recognition (Web Speech API) with natural language understanding (LangChain + LLM) to create an intuitive voice-controlled task management system. Users can speak naturally to add todos, mark them complete, delete them, and search through their tasks.

### Target Users
- Busy professionals who need hands-free task management
- Users with accessibility needs who prefer voice interaction
- People who want to quickly add todos while multitasking
- Anyone interested in voice-controlled applications

### Core Value Proposition
- **Hands-free operation**: Add and manage todos without typing
- **Natural language understanding**: Speak naturally ("Schedule meeting tomorrow at 2 PM") instead of filling forms
- **AI-powered intent recognition**: The system understands context and user intent
- **Voice feedback**: Get confirmation and status updates through voice responses
- **Task categorization**: Automatically categorize tasks based on voice commands

---

## Technology Stack

### Frontend
- React 19
- Vite (build tool)
- Tailwind CSS (styling)
- React Router DOM (routing)
- Axios or Fetch (API calls)
- Web Speech API (browser-native, no external library)

### Backend
- Python 3.12+
- FastAPI (REST API)
- Uvicorn (ASGI server)
- Pydantic (data validation)

### Database
- SQLite (for application data ONLY, NOT authentication)
- Store todos, categories, task metadata

### Authentication
- Firebase Authentication (email/password)
- Firebase SDK in frontend
- No backend authentication endpoints needed

### AI/ML
- LangChain (basic chains for intent understanding)
- Google Gemini LLM (for natural language processing)
- Simple prompt engineering to extract task information

### Development Tools
- UV (Python package manager)
- npm (Node package manager)
- Git (version control)

---

## Project Structure

```
voice-command-todo-manager/
├── Backend/                    # FastAPI backend application
│   ├── main.py                 # Main backend server file
│   ├── pyproject.toml          # Python project configuration
│   ├── requirements.txt        # Python dependencies
│   ├── uv.lock                 # UV lock file
│   ├── README.md               # Backend-specific documentation
│   └── .env                    # Environment variables
│
├── Frontend/                   # React frontend application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service functions
│   │   ├── config/             # Configuration files
│   │   └── ...
│   └── ...
│
├── issues/                     # Project issues (15-20 issues)
│   ├── issue-01-project-setup.md
│   ├── issue-02-landing-page-ui.md
│   └── ...
│
├── project_details.md          # Project planning document
└── PROJECT-README.md          # This file
```

---

## Features

- User authentication with Firebase (email/password)
- Voice input for adding todos using Web Speech API
- Natural language command processing ("Add buy groceries to my shopping list")
- Voice commands for task completion ("Mark task 3 as done")
- Voice commands for task deletion ("Delete my meeting reminder")
- AI-powered intent understanding using LangChain + LLM
- Task categorization via voice commands ("Add this to work tasks")
- Voice feedback/confirmation for actions
- Display all todos in a dashboard
- View individual todo details
- Search todos by text
- Task status management (pending, completed)
- Landing page with app information
- Login and signup functionality

---

## API Endpoints

### Authentication
Authentication is handled entirely by Firebase SDK on the frontend. No backend auth endpoints are needed.

### Todo Endpoints

| Method | Endpoint | Protected | Purpose | LLM Integration |
|--------|----------|-----------|---------|-----------------|
| POST | /api/todos | Yes | Create new todo from voice/text | Yes |
| GET | /api/todos | Yes | Get all user todos | No |
| GET | /api/todos/:id | Yes | Get single todo | No |
| PUT | /api/todos/:id | Yes | Update todo (status, task, category) | No |
| DELETE | /api/todos/:id | Yes | Delete todo | No |
| POST | /api/todos/process-voice | Yes | Process voice command with LLM | Yes |
| GET | /api/todos/search | Yes | Search todos by text | No |
| GET | /api/todos/category/:category | Yes | Get todos by category | No |

**Note:** All endpoints require Firebase authentication token (handled on frontend).

---

## Frontend Pages

| Page Name | Route | Protected | Purpose | Main Components |
|-----------|-------|-----------|---------|-----------------|
| Landing | / | No | Welcome page with app info | Navbar, Hero, Features, Footer |
| Signup | /signup | No | User registration | SignupForm |
| Login | /login | No | User authentication | LoginForm |
| Dashboard | /dashboard | Yes | Main todo interface | Navbar, TodoList, VoiceInput, VoiceFeedback |
| Todo Detail | /todos/:id | Yes | View single todo | TodoDetail, VoiceCommands |
| Profile | /profile | Yes | User profile settings | ProfileForm, SettingsPanel |

---

## Frontend Components

| Component Name | Used On Pages | Purpose |
|----------------|---------------|---------|
| Navbar | All pages | Navigation header |
| Hero | Landing | Hero section with CTA |
| Features | Landing | Feature showcase |
| Footer | All pages | Footer with links |
| SignupForm | Signup | Registration form |
| LoginForm | Login | Login form |
| TodoList | Dashboard | Display todos |
| TodoCard | Dashboard | Single todo card |
| VoiceInput | Dashboard | Voice recording interface |
| VoiceFeedback | Dashboard | Audio feedback component |
| VoiceCommandButton | Dashboard | Start/stop voice input |
| TodoDetail | Todo Detail | Full todo view |
| VoiceCommands | Todo Detail | Voice command examples |
| SearchBar | Dashboard | Search interface |
| CategoryFilter | Dashboard | Filter by category |
| LoadingSpinner | Multiple | Loading indicator |
| ErrorMessage | Multiple | Error display |
| ProfileForm | Profile | User profile form |
| SettingsPanel | Profile | App settings |

---

## Issue Flow

### Foundation Phase (Issues 1-8)
1. **Issue #01**: Project Setup (README format)
2. **Issue #02**: Landing Page UI (static)
3. **Issue #03**: Signup Page UI (static)
4. **Issue #04**: Login Page UI (static)
5. **Issue #05**: Firebase Auth Setup
6. **Issue #06**: Integrate Signup with Firebase
7. **Issue #07**: Integrate Login with Firebase
8. **Issue #08**: Dashboard UI (protected route)

### Core Features Phase (Issues 9-15)
9. **Issue #09**: Voice Input Component (Web Speech API)
10. **Issue #10**: Process Voice Commands with LLM (LangChain integration)
11. **Issue #11**: Create Todo Feature (combined frontend + backend)
12. **Issue #12**: Display Todos (combined frontend + backend)
13. **Issue #13**: Todo Detail View (combined frontend + backend)
14. **Issue #14**: Update Todo Status (combined frontend + backend)
15. **Issue #15**: Delete Todo Feature (combined frontend + backend)

### Advanced Features Phase (Issues 16-18)
16. **Issue #16**: Voice Feedback (SpeechSynthesis API)
17. **Issue #17**: Task Categorization (LLM-based)
18. **Issue #18**: Search Feature (combined frontend + backend)

### Final Phase (Issue 19)
19. **Issue #19**: Final Testing and Application Flow Verification

**Total Issues:** 19

---

## User Journey

### 1. First Visit
- User lands on Landing page
- Sees features and benefits of voice-controlled todos
- Clicks "Sign Up"

### 2. Registration
- Fills signup form
- Firebase creates account
- Redirects to login

### 3. Login
- Enters credentials
- Firebase authenticates
- Redirects to Dashboard

### 4. Main Usage
- Views dashboard with todos list
- Clicks microphone button to start voice input
- Speaks command: "Add buy groceries to my shopping list"
- System transcribes and processes with LLM
- LLM extracts task details and category
- Todo is created and displayed
- Voice feedback confirms: "Added buy groceries to shopping list"
- Can complete todos via voice: "Mark task 1 as done"
- Can delete todos via voice: "Delete my shopping list task"
- Searches todos by text
- Filters by category

### 5. Detail View
- Clicks on todo card
- Views full details
- Can update status or delete
- Sees voice command examples

---

## Data Flow

```
User Voice Input → Web Speech API → Transcribed Text → Frontend Component → API Call → Backend Endpoint → LangChain + LLM → Intent Understanding → Database → Response → UI Update → Voice Feedback
```

### Example Flow:
```
User speaks "Add meeting tomorrow at 2 PM" 
→ Web Speech API transcribes 
→ POST /api/todos/process-voice 
→ LangChain + LLM extracts: intent=add, task="meeting", date="tomorrow 2 PM" 
→ POST /api/todos creates todo 
→ Response 
→ Display in Dashboard 
→ Voice feedback: "Added meeting for tomorrow at 2 PM"
```

---

## Database Schema (High-Level)

### Tables

**todos**
- Purpose: Store todo items with their details
- Essential fields: identifier, user reference, task text, status, timestamps
- Additional fields: category, priority, due date (students decide)

**categories** (optional)
- Purpose: Store task categories
- Can be stored as string in todos table or separate table
- Students decide structure and relationships

**Note:** Students design their own schemas. No authentication data in SQLite (use Firebase).

---

## Development Workflow

1. **Setup**: Follow Issue #01 to set up the project
2. **Foundation**: Complete Issues #02-08 to build UI and authentication
3. **Core Features**: Complete Issues #09-15 to implement main functionality
4. **Advanced Features**: Complete Issues #16-18 to add enhancements
5. **Testing**: Complete Issue #19 to verify everything works

---

## Key Technologies Explained

### Web Speech API
- Browser-native API for speech recognition and synthesis
- No external libraries needed
- Supported in Chrome, Edge, Safari (with limitations)
- Provides both SpeechRecognition (voice input) and SpeechSynthesis (voice output)

### LangChain + LLM
- Uses Google Gemini LLM via LangChain
- Processes natural language commands
- Extracts intent, task details, categories
- No specialized NLP libraries needed

### Firebase Authentication
- Handles all authentication on frontend
- No backend auth logic required
- Email/password authentication
- Token-based security

### SQLite
- Local database for application data
- Simple and lightweight
- Perfect for learning and development
- NOT used for authentication (Firebase handles that)

---

## Common Challenges and Solutions

### Challenge: Web Speech API accuracy varies by browser and accent
**Solution:** Provide text editing option, show transcribed text for confirmation, handle errors gracefully

### Challenge: Natural language understanding may misinterpret commands
**Solution:** Implement confirmation step, allow manual editing, provide clear feedback on what was understood

### Challenge: LLM API rate limits and costs
**Solution:** Implement caching for common commands, batch requests when possible, provide user feedback on processing

### Challenge: Voice feedback timing and interruption
**Solution:** Queue voice responses, allow users to stop audio, provide visual feedback alongside audio

### Challenge: Browser compatibility for Web Speech API
**Solution:** Check browser support, provide fallback to text input, inform users of requirements

---

## Success Criteria

### Technical Success
- [ ] All endpoints work correctly
- [ ] Firebase authentication functions properly
- [ ] Web Speech API captures voice input accurately
- [ ] LLM integration understands natural language commands
- [ ] Voice feedback provides clear confirmations
- [ ] Database operations are reliable
- [ ] Frontend is responsive and user-friendly
- [ ] Voice commands work for add, complete, delete operations

### Learning Success
- [ ] Students understand full-stack development
- [ ] Students can connect frontend to backend
- [ ] Students learn Firebase authentication
- [ ] Students understand Web Speech API usage
- [ ] Students learn LLM integration for natural language understanding
- [ ] Students can debug and fix issues independently
- [ ] Students understand voice-controlled application architecture

### Project Completion
- [ ] All features from feature list are implemented
- [ ] Application works end-to-end with voice commands
- [ ] Code is clean and documented
- [ ] UI is polished and accessible
- [ ] Voice feedback is clear and helpful
- [ ] Project is ready for demonstration

---

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Web Speech API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [LangChain Documentation](https://python.langchain.com/)
- [Google Generative AI Documentation](https://ai.google.dev/docs)
- [React Router Documentation](https://reactrouter.com/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---

## Notes

- This project uses only allowed technologies (React, FastAPI, SQLite, Firebase, LangChain)
- No prohibited technologies (JWT, Docker, OCR libraries, etc.)
- Students design their own database schemas
- Focus on learning, not perfection
- Ask for help when stuck
- Document decisions and learnings

---

## License

This is a template project for educational purposes.
