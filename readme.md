# 📝 To-Do List Web App

A simple and interactive **To-Do List application** built using **HTML, CSS, and JavaScript**. This project allows users to manage tasks efficiently with features like adding, editing, deleting, filtering, and persisting tasks using browser local storage.

---

## 📌 Overview

This project is a **client-side task management app** that demonstrates:

- Dynamic DOM manipulation  
- Persistent storage using `localStorage`  
- Clean UI with responsive design  
- Real-time updates without page reloads  

The app is lightweight, fast, and runs entirely in the browser — no backend required.

---

## 🚀 Features

### ➕ Task Management
- Add new tasks  
- Delete individual tasks  
- Clear entire task list  
- Mark tasks as completed  

### ✏️ Editing System
- Edit tasks via a modal popup  
- Update task descriptions dynamically  

### ✅ Completion Tracking
- Toggle task completion status  
- Visual indicators:
  - ✔ Completed (green)
  - ✘ Incomplete (red)
- Line-through styling for completed tasks  

### 🔍 Filtering
- Show only completed tasks using checkbox filter  

### 💾 Data Persistence
- Tasks are stored in `localStorage`  
- Data remains after page refresh  

### ⚠️ Error Handling
- Prevents empty task submission  
- Displays temporary error messages  

---

## 🗂️ Project Structure

```
.
├── index.html      # Main structure of the app
├── styles.css      # Styling and layout
├── scripts.js      # Application logic
└── imgs/           # Icons (favicon, etc.)
```

---

## ▶️ How to Run

### Option 1: Open Directly
1. Open `index.html` in your browser  
2. Start adding tasks immediately  

### Option 2 (Recommended)
Use a local server:

```bash
# VS Code Live Server
Right-click index.html → Open with Live Server
```

---

## ⚠️ Limitations

- No backend/database (browser-only storage)  
- Tasks are not shared across devices  
- No user authentication  

---

## 👨‍💻 Author

Manar Merhi
