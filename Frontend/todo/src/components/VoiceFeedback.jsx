import { useEffect, useState, useRef } from "react";
import "./VoiceFeedback.css";

const VoiceFeedback = ({ message }) => {
  const [isSupported, setIsSupported] = useState(true);
  const [enabled, setEnabled] = useState(
    localStorage.getItem("voiceEnabled") !== "false"
  );

  const utteranceRef = useRef(null);

  // Check browser support
  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setIsSupported(false);
    }
  }, []);

  // Speak when message changes
  useEffect(() => {
    if (!message || !enabled || !isSupported) return;

    speak(message);
  }, [message]);

  const speak = (text) => {
    window.speechSynthesis.cancel(); // stop previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    // Use default voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices[0];
    }

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  const toggleVoice = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    localStorage.setItem("voiceEnabled", newValue);
  };

  if (!isSupported) {
    return null; // silent fallback
  }

  return (
  <div className="voice-controls">
    <button
      className={`voice-btn ${enabled ? "danger" : "primary"}`}
      onClick={toggleVoice}
    >
      {enabled ? "Disable Voice" : "Enable Voice"}
    </button>

    <button
      className="voice-btn secondary"
      onClick={stopSpeaking}
    >
      Stop Voice
    </button>
  </div>
);
};
export default VoiceFeedback;
