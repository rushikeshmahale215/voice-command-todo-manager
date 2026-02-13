import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Top */}
      <div className="sidebar-top">
        <h2 className="logo">
          {!collapsed && "VoiceTodo"}
        </h2>

        <ul className="sidebar-menu">
          <li>
            <button onClick={() => navigate("/dashboard")}>
              📋 {!collapsed && "Dashboard"}
            </button>
          </li>

          <li>
            <button onClick={() => navigate("/completed")}>
              ⭕ {!collapsed && "Completed"}
            </button>
          </li>
          
          <li>
            <button onClick={() => navigate("/pending")}>
              ⏳ {!collapsed && "Pending"}
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/analytics")}>
              📊 {!collapsed && "Analytics"}
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/about")}>
              ℹ️ {!collapsed && "About"}
            </button>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="sidebar-footer">
        <button onClick={() => navigate("/settings")}>
          ⚙ {!collapsed && "Settings"}
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 {!collapsed && "Logout"}
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;


