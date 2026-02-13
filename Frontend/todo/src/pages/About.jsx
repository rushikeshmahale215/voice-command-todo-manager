import Sidebar from "../pages/Sidebar";
import "./About.css";

const About = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="content about-content">
        <div className="about-wrapper">
          <h1 className="about-title">About VoiceTodo</h1>
          <p className="about-subtitle">
            Smart Voice-Enabled Task Management System
          </p>

          <section className="about-section">
            <h2>🚀 What is VoiceTodo?</h2>
            <p>
              VoiceTodo is an intelligent productivity application that allows
              users to create, manage, update, search, and delete tasks using
              voice commands and manual input. It is designed to simplify task
              management and improve efficiency.
            </p>
          </section>

          <section className="about-section">
            <h2>🎤 How Voice Command Works</h2>
            <ul>
              <li>Click the microphone button on dashboard.</li>
              <li>Speak your task (e.g., "Add meeting at 7 PM").</li>
              <li>Speech is converted into text using Web Speech API.</li>
              <li>The backend processes and stores the task in database.</li>
              <li>The new task appears instantly in your dashboard.</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>✨ Core Features</h2>

            <div className="feature-grid">
              <div className="feature-card">
                <h3>Create Todo</h3>
                <p>Add tasks using voice or manual input.</p>
              </div>

              <div className="feature-card">
                <h3>Update Status</h3>
                <p>Mark tasks as completed or pending.</p>
              </div>

              <div className="feature-card">
                <h3>Delete Todo</h3>
                <p>Remove tasks permanently from database.</p>
              </div>

              <div className="feature-card">
                <h3>Search & Filter</h3>
                <p>Search tasks by text and filter by category.</p>
              </div>

              <div className="feature-card">
                <h3>Completed Page</h3>
                <p>View only completed tasks in separate route.</p>
              </div>

              <div className="feature-card">
                <h3>Analytics</h3>
                <p>Track total, completed, and pending todos.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>⚙️ Technical Stack</h2>
            <ul>
              <li>Frontend: React + Vite</li>
              <li>Backend: FastAPI</li>
              <li>Database: SQLite</li>
              <li>Voice Recognition: Web Speech API</li>
              <li>REST API Architecture</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
