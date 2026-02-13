import { useEffect, useRef, useState } from "react";
import VoiceCommandButton from "./VoiceCommandButton";
import "./VoiceInput.css";

const VoiceInput = ({ onFinalResult }) => {
  const recognitionRef = useRef(null);

  const finalTextRef = useRef("");

  const shouldListenRef = useRef(false);


  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [error, setError] = useState("");



  // Browser support + setup

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

    recognition.onerror = (event) => {
      setError(getErrorMessage(event.error));

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);

      if (shouldListenRef.current) {
        recognition.start(); // auto-restart
        setIsListening(true);
      } else {
        if (finalText && onFinalResult) {
          onFinalResult(finalText.trim());
        }
        setInterimText("");
      }
    };

    recognitionRef.current = recognition;
  }, [finalText, onFinalResult]);

  const startListening = () => {
    setError("");
    finalTextRef.current = "";
    setFinalText("");
    setInterimText("");
    shouldListenRef.current = true;

    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {

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

    shouldListenRef.current = false;
    recognitionRef.current.stop();
    setIsListening(false);

  };

  if (!isSupported) {
    return (
      <p className="error-text">
          ❌ Voice input is not supported in this browser.
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

export default VoiceInput;