import "./VoiceCommandButton.css";

const VoiceCommandButton = ({ isListening, onStart, onStop }) => {

  const handleClick = () => {
    if (isListening) {
      onStop();
    } else {
      onStart();
    }
  };

  return (
    <button
      className={`voice-button ${isListening ? "listening" : ""}`}
      title="Add todo using voice"
      onClick={handleClick}
    >
      {isListening ? "🛑 Stop" : "🎙️ Speak"}
    </button>
  );
};

export default VoiceCommandButton;

