# ⚡ Online React Code Editor

An interactive, full-stack online playground to write, run, and manage React applications in the browser — built with modern technologies like Docker, Monaco Editor, xterm.js, and a custom backend using Node.js and Express.

---

## 🚀 Features

- 🧠 **Create React Playground** — Instantly spin up a new React project using `npm create vite@latest`
- 📁 **Dynamic Project Tree** — File structure loads via Zustand state management and backend APIs
- ⌨️ **Built-in Terminal** — Docker-powered terminal environment with real-time shell access using `xterm.js`
- 🖋️ **Code with Monaco Editor** — Full IDE-like editing experience with syntax highlighting and IntelliSense
- 🔌 **WebSocket Communication** — Terminal and backend synced via `Socket.IO` for seamless command execution
- 🐳 **Isolated Execution** — Each session runs in a secure Docker container for safe and isolated processes

---

## 🛠️ Tech Stack

- **Frontend**: React, Zustand, Tailwind CSS, Monaco Editor
- **Backend**: Node.js, Express, Docker, Socket.IO, child_process (`exec`)
- **Terminal**: xterm.js with WebSocket integration
- **Editor**: Monaco Editor with real-time editing support

---

## 🔍 How It Works

1. **Create Playground**
   - User clicks the `Create Playground` button on the homepage.
   - Backend runs `npm create vite@latest` using Node's `child_process.exec`.
   - A new project is scaffolded and user is redirected to `/editor`.

2. **Load Project Tree**
   - The file structure is read and sent to the frontend using Express APIs.
   - Zustand manages the global state for files and directories.

3. **Real-time Terminal**
   - WebSocket (`socket.io`) connects frontend to backend.
   - Terminal commands are executed in an isolated Node.js Docker container.

4. **Code and Run**
   - Monaco Editor provides rich code editing.
   - User can install packages, run dev server, and manage code live from the browser.

---

## 📦 Installation & Setup

> ⚠️ Requires Docker installed and running locally.

```bash
# Clone the repo
git clone https://github.com/Sourabh-km13/CodeEditor/
cd CodeEditor

# Install dependencies for frontend and backend
cd frontend && npm install
cd ../backend && npm install

# Start the backend
cd ../backend
npm run dev

# Start the frontend
cd ../frontend
npm run dev
