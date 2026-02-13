import "./VoiceCommandButton.css";

const VoiceCommandButton = ({ isListening, onStart, onStop }) => {
  return (
    <button className="voice-button" title="Add todo using voice">
      🎙️
    </button>
  );
};

export default VoiceCommandButton;
