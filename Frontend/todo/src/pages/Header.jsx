import "./Dashboard.css";

const Header = ({ user, onMenuClick }) => {
  return (
    <header className="dashboard-header">
      {/* Left: Hamburger + App info */}
      <div className="header-left">
        <button className="hamburger-btn" onClick={onMenuClick}>
          ☰
        </button>

        <div className="app-info">
          <span className="app-icon">🎙</span>
          <div>
            <h1 className="app-title">VoiceTasker</h1>
            <p className="app-subtitle">Voice your to-do list</p>
          </div>
        </div>
      </div>

      {/* Right: User info */}
      <div className="header-right">
        <div className="user-details">
          <span className="user-name">
            {user?.displayName || user?.email?.split("@")[0] || "User"}
          </span>
          <span className="user-email">{user?.email}</span>
        </div>

        <div className="user-avatar">
          {user?.displayName?.charAt(0) || "U"}
        </div>
      </div>
    </header>
  );
};

export default Header;
