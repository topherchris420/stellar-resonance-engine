
import { useState, useEffect, useRef } from "react";
import { IndicatorLight } from "@/components/ui/indicator-light";
import { RetroDisplay } from "@/components/ui/retro-display";
import { cn } from "@/lib/utils";

interface CosmicCalibrationProps {
  onComplete?: () => void;
  duration?: number;
  birthData?: {
    name?: string;
    birthDate?: string;
    birthLocation?: string;
  };
}

export function CosmicCalibration({
  onComplete,
  duration = 5000,
  birthData
}: CosmicCalibrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [calibrationText, setCalibrationText] = useState("INIT");
  const [frequency, setFrequency] = useState(0);
  const [lightPattern, setLightPattern] = useState([false, false, false, false, false]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const totalSteps = 5;
  
  useEffect(() => {
    // Create our oscillator for cosmic sounds
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 440;
    gainNode.gain.value = 0.1;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    // Sequence through calibration steps
    const timePerStep = duration / totalSteps;
    
    const runCalibration = () => {
      let step = 1;
      
      const interval = setInterval(() => {
        if (step > totalSteps) {
          clearInterval(interval);
          oscillator.stop();
          audioContext.close();
          if (onComplete) onComplete();
          return;
        }
        
        setCurrentStep(step);
        
        // Update display values
        switch(step) {
          case 1:
            setCalibrationText("INIT");
            setFrequency(110);
            setLightPattern([true, false, false, false, false]);
            oscillator.frequency.value = 110;
            break;
          case 2:
            setCalibrationText("SCAN");
            setFrequency(220);
            setLightPattern([true, true, false, false, false]);
            oscillator.frequency.value = 220;
            break;
          case 3:
            setCalibrationText("ALIGN");
            setFrequency(330);
            setLightPattern([true, true, true, false, false]);
            oscillator.frequency.value = 330;
            break;
          case 4:
            setCalibrationText("TUNE");
            setFrequency(440);
            setLightPattern([true, true, true, true, false]);
            oscillator.frequency.value = 440;
            break;
          case 5:
            setCalibrationText("READY");
            setFrequency(528);
            setLightPattern([true, true, true, true, true]);
            oscillator.frequency.value = 528;
            break;
        }
        
        step++;
      }, timePerStep);
      
      return () => {
        clearInterval(interval);
        oscillator.stop();
        audioContext.close();
      };
    };
    
    const cleanup = runCalibration();
    return cleanup;
  }, [duration, onComplete]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-gray-900 border-2 border-gray-700 rounded-lg p-6 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-xl text-gold font-mono font-bold tracking-wider mb-1">
            COSMIC CALIBRATION SEQUENCE
          </h2>
          <p className="text-sm text-aqua/80 font-mono">
            {birthData?.name ? `SUBJECT: ${birthData.name}` : "INITIALIZING CELESTIAL MATRIX"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center justify-between">
            <RetroDisplay 
              value={calibrationText} 
              color="amber"
              digits={6}
            />
            <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-aqua to-gold transition-all duration-1000 ease-in-out"
                style={{ width: `${(currentStep/totalSteps) * 100}%` }}
              />
            </div>
            <RetroDisplay 
              value={frequency.toFixed(1)} 
              color="green"
              label="FREQ"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 py-6">
            <div className="w-full flex justify-center space-x-6">
              {lightPattern.map((isActive, i) => (
                <IndicatorLight 
                  key={i}
                  active={isActive}
                  blinking={i === currentStep - 1}
                  color={i % 2 === 0 ? "aqua" : "gold"}
                />
              ))}
            </div>
            
            <div className="relative w-48 h-48 bg-black rounded-full overflow-hidden flex items-center justify-center">
              <div className={cn(
                "absolute inset-0",
                "bg-gradient-to-br from-blue-900/30 via-transparent to-violet-900/20"
              )}></div>
              
              <div className={cn(
                "absolute w-full h-full",
                "animate-[spin_5s_linear_infinite]"
              )}>
                <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gold/40 transform -translate-x-1/2 origin-bottom"></div>
                <div className="absolute top-1/2 left-0 w-1/2 h-0.5 bg-aqua/40 transform -translate-y-1/2 origin-right"></div>
                <div className="absolute top-1/2 right-0 w-1/2 h-0.5 bg-magenta/40 transform -translate-y-1/2 origin-left"></div>
              </div>
              
              <div className="relative z-10 w-20 h-20 rounded-full bg-black border-4 border-gray-800">
                <div className="absolute inset-2 rounded-full bg-gray-900 animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="text-center font-mono text-sm text-gray-400 animate-pulse">
            {currentStep < totalSteps ? (
              <span>Calibrating {currentStep}/{totalSteps}...</span>
            ) : (
              <span className="text-green-400">Calibration Complete</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
