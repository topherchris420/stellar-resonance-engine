
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DustOverlayProps {
  active?: boolean;
  intensity?: "light" | "medium" | "heavy";
  flickerFrequency?: "low" | "medium" | "high";
}

export function DustOverlay({
  active = true,
  intensity = "medium",
  flickerFrequency = "low",
}: DustOverlayProps) {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    if (!active) return;
    
    // Define flicker intervals based on frequency
    const intervals = {
      low: [8000, 12000],
      medium: [5000, 8000],
      high: [2000, 5000],
    };
    
    // Randomly flicker the screen
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), Math.random() * 100 + 50);
      }
    }, Math.random() * (intervals[flickerFrequency][1] - intervals[flickerFrequency][0]) + intervals[flickerFrequency][0]);
    
    return () => clearInterval(flickerInterval);
  }, [active, flickerFrequency]);
  
  if (!active) return null;
  
  const intensityClasses = {
    light: "opacity-10",
    medium: "opacity-20",
    heavy: "opacity-30",
  };
  
  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-50 pointer-events-none",
          "bg-[url('data:image/png;base64,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.........'),
          intensityClasses[intensity]
        )}
      />
      {flicker && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-white opacity-5 animate-flicker"></div>
      )}
    </>
  );
}
