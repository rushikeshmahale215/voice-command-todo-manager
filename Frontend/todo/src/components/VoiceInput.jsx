import { useEffect, useRef, useState } from "react";
import VoiceCommandButton from "./VoiceCommandButton";
import "./VoiceInput.css";

const VoiceInput = ({ onFinalResult }) => {
  const recognitionRef = useRef(null);
  const shouldListenRef = useRef(false);
  const finalTextRef = useRef("");

  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [error, setError] = useState("");

  // ✅ Initialize SpeechRecognition ONLY ONCE
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    // 🎤 Speech result handler
    recognition.onresult = (event) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          final += text;
        } else {
          interim += text;
        }
      }

      setInterimText(interim);

      if (final) {
        finalTextRef.current += final;
        setFinalText(finalTextRef.current);
      }
    };

    // ❌ Error handler
    recognition.onerror = (event) => {
      console.log("Speech error:", event.error);
      setError(getErrorMessage(event.error));
      setIsListening(false);
    };

    // 🔁 Auto restart while listening
    recognition.onend = () => {
      if (shouldListenRef.current) {
        recognition.start();
      } else {
        setIsListening(false);

        const result = finalTextRef.current.trim();

        if (result && onFinalResult) {
          onFinalResult(result);
        }

        setInterimText("");
      }
    };

    recognitionRef.current = recognition;

    // cleanup
    return () => {
      recognition.stop();
    };
  }, [onFinalResult]);

  // ✅ Start Listening
  const startListening = () => {
    if (!recognitionRef.current) return;

    console.log("Starting voice recognition...");

    setError("");
    finalTextRef.current = "";
    setFinalText("");
    setInterimText("");

    shouldListenRef.current = true;

    recognitionRef.current.start();
    setIsListening(true);
  };

  // ✅ Stop Listening
  const stopListening = () => {
    if (!recognitionRef.current) return;

    shouldListenRef.current = false;

    recognitionRef.current.stop();
    setIsListening(false);

    const result = finalTextRef.current.trim();

    if (result && onFinalResult) {
      console.log("FINAL VOICE:", result);
      onFinalResult(result);
    }

    finalTextRef.current = "";
    setFinalText("");
    setInterimText("");
  };

  // ❌ Browser not supported
  if (!isSupported) {
    return (
      <p className="error-text">
        ❌ Voice input not supported in this browser.
        <br />
        Use Chrome or Edge.
      </p>
    );
  }

  return (
    <div className="voice-container">
      <VoiceCommandButton
        isListening={isListening}
        onStart={startListening}
        onStop={stopListening}
      />

      {isListening && <p className="listening">🎤 Listening...</p>}

      {(finalText || interimText) && (
        <div className="transcript-box">
          <span>{finalText}</span>
          <span className="interim">{interimText}</span>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

// ✅ Error messages helper
function getErrorMessage(error) {
  switch (error) {
    case "not-allowed":
      return "Microphone permission denied.";
    case "no-speech":
      return "No speech detected.";
    case "audio-capture":
      return "No microphone found.";
    case "network":
      return "Network error occurred.";
    default:
      return "Voice recognition error.";
  }
}

export default VoiceInput;
