import { useState, useCallback, useRef } from 'react';

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn("Stop recognition failed:", e);
      }
      recognitionRef.current = null;
    }
  }, []);

  const startListening = useCallback(async () => {
    // 1. Cleanup any existing session first
    stopListening();
    setError(null);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    try {
        // 2. Request mic permissions (Warms up the audio context)
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US'; // Primary language
        recognition.interimResults = true; 
        recognition.maxAlternatives = 1;
        recognition.continuous = false;

        recognition.onstart = () => setIsListening(true);
        
        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    // Update transcript with interim results for better feedback
                    setTranscript(event.results[i][0].transcript);
                }
            }
            if (finalTranscript) setTranscript(finalTranscript);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech Recognition Error Detailed:", event.error);
            let msg = event.error;
            if (event.error === 'network') {
                msg = "Network blocked. If you use Brave, enable 'Google Services' in settings. / Si usas Brave, activa 'Servicios de Google' en ajustes.";
            } else if (event.error === 'not-allowed') {
                msg = "Microphone access denied. / Acceso al micro denegado.";
            }
            setError(msg);
            setIsListening(false);
        };

        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
        recognition.start();
    } catch (err: any) {
        console.error("Microphone Access Denied:", err);
        setError('Microphone access denied or connection error.');
        setIsListening(false);
    }
  }, [stopListening]);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening
  };
};
