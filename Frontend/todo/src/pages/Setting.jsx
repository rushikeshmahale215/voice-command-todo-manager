import VoiceFeedback from "../components/VoiceFeedback";
import "./Setting.css";

const Setting = () => {
  return (
    <div className="setting-page">
      <div className="setting-card">
        <h2 className="setting-title">Settings</h2>
        <p className="setting-subtitle">
          Manage your voice preferences and application settings.
        </p>

        <div className="setting-section">
          <h3>Voice Controls</h3>
          <VoiceFeedback />
        </div>
      </div>
    </div>
  );
};

export default Setting;
