
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ChartData } from "@/pages/Index";

interface ResonantTonesProps {
  chartData: ChartData;
}

export const ResonantTones = ({ chartData }: ResonantTonesProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([0.3]);
  const [activePlanet, setActivePlanet] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<Map<string, OscillatorNode>>(new Map());
  const gainNodesRef = useRef<Map<string, GainNode>>(new Map());

  useEffect(() => {
    // Initialize Web Audio API
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      stopAllTones();
      audioContextRef.current?.close();
    };
  }, []);

  const startTone = (planet: string, frequency: number) => {
    if (!audioContextRef.current) return;

    // Stop existing tone for this planet
    stopTone(planet);

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(volume[0] * 0.1, audioContextRef.current.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.start();
    
    oscillatorsRef.current.set(planet, oscillator);
    gainNodesRef.current.set(planet, gainNode);
    
    setActivePlanet(planet);
  };

  const stopTone = (planet: string) => {
    const oscillator = oscillatorsRef.current.get(planet);
    const gainNode = gainNodesRef.current.get(planet);
    
    if (oscillator && gainNode && audioContextRef.current) {
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.1);
      oscillator.stop(audioContextRef.current.currentTime + 0.1);
      
      oscillatorsRef.current.delete(planet);
      gainNodesRef.current.delete(planet);
    }
    
    if (activePlanet === planet) {
      setActivePlanet(null);
    }
  };

  const stopAllTones = () => {
    oscillatorsRef.current.forEach((oscillator, planet) => {
      stopTone(planet);
    });
    setIsPlaying(false);
    setActivePlanet(null);
  };

  const playHarmony = () => {
    if (isPlaying) {
      stopAllTones();
      return;
    }

    chartData.planets.forEach((planet, index) => {
      setTimeout(() => {
        startTone(planet.name, planet.frequency);
      }, index * 500);
    });
    
    setIsPlaying(true);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-aqua mb-2">🎵 Resonant Tone Agent</h3>
        <p className="text-aqua/80">Healing frequencies from your stellar configuration</p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={playHarmony}
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              isPlaying 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gradient-to-r from-aqua to-blue-500 hover:from-aqua/80 hover:to-blue-500/80 text-white'
            }`}
          >
            {isPlaying ? 'Stop Harmony' : 'Play Cosmic Harmony'}
          </Button>
          
          <div className="flex items-center space-x-3">
            <span className="text-white/70">Volume</span>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={1}
              min={0}
              step={0.1}
              className="w-24"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {chartData.planets.map((planet) => (
            <div
              key={planet.name}
              className={`
                p-4 rounded-lg border transition-all duration-300 cursor-pointer
                ${activePlanet === planet.name
                  ? 'bg-aqua/30 border-aqua shadow-lg shadow-aqua/20 scale-105'
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
                }
              `}
              onClick={() => {
                if (activePlanet === planet.name) {
                  stopTone(planet.name);
                } else {
                  startTone(planet.name, planet.frequency);
                }
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-white">{planet.name}</h4>
                  <p className="text-sm text-white/70">{planet.sign} • House {planet.house}</p>
                </div>
                <div className="text-right">
                  <p className="text-aqua font-mono">{planet.frequency.toFixed(2)} Hz</p>
                  <p className="text-xs text-white/60">
                    {activePlanet === planet.name ? 'Playing...' : 'Tap to play'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-aqua/20 to-blue-500/20 rounded-lg p-4 text-center">
          <p className="text-white/90 text-sm">
            Each planetary frequency resonates with specific chakras and energy centers, 
            creating a unique sonic signature for healing and alignment.
          </p>
        </div>
      </div>
    </Card>
  );
};
