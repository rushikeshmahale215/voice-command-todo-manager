import ProtectedRoute from '../components/ProtectedRoute';
import './landing.css'
import LearnMore from './LearnMore';
import { useNavigate } from "react-router-dom";

const handleLearnMore = () => {
  document.getElementById("learn-more")?.scrollIntoView({
    behavior: "smooth",
  });
};
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">VoiceTodo</h2>
        <button onClick={() => navigate("/login")} className="login-btn">Login</button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Manage Your Todos with Your Voice </h1>
        <p>
          Add, delete, and manage tasks hands-free using simple voice commands.
          Stay productive without touching your keyboard.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => navigate("/dashboard")}>Get Started</button>
          <button className="secondary-btn" onClick={handleLearnMore}>Learn More</button>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-card">
          <h3> Voice Commands</h3>
          <p>Create and manage todos just by speaking.</p>
        </div>

        <div className="feature-card">
          <h3> Fast & Simple</h3>
          <p >No typing. No distractions. Just speak.</p>
        </div>

        <div className="feature-card">
          <h3> Responsive</h3>
          <p>Works smoothly on desktop and mobile devices.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">

        <p>© {new Date().getFullYear()} VoiceTodo. All rights reserved.</p>


      </footer>
    </div>
    <LearnMore />
  </> 
  );
};

     

export default LandingPage;
