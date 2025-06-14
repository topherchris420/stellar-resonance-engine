
import { useCallback, useRef } from 'react';

interface SoundEffectsHook {
  playButtonClick: () => void;
  playModuleChange: () => void;
  playCalibration: (frequency: number) => void;
  playSuccess: () => void;
  playError: () => void;
}

export const useSoundEffects = (): SoundEffectsHook => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number = 100, type: OscillatorType = 'sine') => {
    try {
      const audioContext = getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.log('Audio not available');
    }
  }, [getAudioContext]);

  const playButtonClick = useCallback(() => {
    playTone(800, 50, 'square');
  }, [playTone]);

  const playModuleChange = useCallback(() => {
    playTone(440, 100);
    setTimeout(() => playTone(880, 100), 50);
  }, [playTone]);

  const playCalibration = useCallback((frequency: number) => {
    playTone(frequency, 200);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    playTone(523.25, 100); // C5
    setTimeout(() => playTone(659.25, 100), 100); // E5
    setTimeout(() => playTone(783.99, 200), 200); // G5
  }, [playTone]);

  const playError = useCallback(() => {
    playTone(200, 300, 'sawtooth');
  }, [playTone]);

  return {
    playButtonClick,
    playModuleChange,
    playCalibration,
    playSuccess,
    playError
  };
};
