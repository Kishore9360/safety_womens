import { useState, useEffect, useCallback, useRef } from 'react';

export const useVoiceActivation = (onTrigger: () => void, keywords = ['help me', 'help', 'bachao', 'emergency']) => {
  const [isListening, setIsListening] = useState(false);
  const [lastHeard, setLastHeard] = useState('');
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript.toLowerCase())
        .join(' ');
      setLastHeard(transcript);
      if (keywords.some(kw => transcript.includes(kw))) {
        onTrigger();
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => {
      if (isListening) recognition.start();
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, [onTrigger, keywords, isListening]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
  }, []);

  useEffect(() => {
    return () => { recognitionRef.current?.stop(); };
  }, []);

  return { isListening, lastHeard, startListening, stopListening };
};
