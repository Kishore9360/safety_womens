import { useState, useCallback, useRef } from 'react';

export const useFakeCall = () => {
  const [isRinging, setIsRinging] = useState(false);
  const [isOnCall, setIsOnCall] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerFakeCall = useCallback((delaySeconds = 5) => {
    timerRef.current = setTimeout(() => {
      setIsRinging(true);
      // Use oscillator for ringtone
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 440;
        gain.gain.value = 0.3;
        osc.start();
        audioRef.current = { pause: () => { osc.stop(); ctx.close(); } } as any;
        // Auto-ring pattern
        const ringInterval = setInterval(() => {
          gain.gain.value = gain.gain.value > 0 ? 0 : 0.3;
        }, 500);
        setTimeout(() => clearInterval(ringInterval), 30000);
      } catch {}
    }, delaySeconds * 1000);
  }, []);

  const answerCall = useCallback(() => {
    audioRef.current?.pause();
    setIsRinging(false);
    setIsOnCall(true);
  }, []);

  const endCall = useCallback(() => {
    audioRef.current?.pause();
    setIsRinging(false);
    setIsOnCall(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return { isRinging, isOnCall, triggerFakeCall, answerCall, endCall };
};
