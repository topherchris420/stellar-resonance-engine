
import * as React from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface RetroKnobProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  onValueChange?: (value: number) => void;
  dialSize?: "sm" | "md" | "lg";
}

export function RetroKnob({
  className,
  value,
  min = 0,
  max = 100,
  step = 1,
  label,
  onValueChange,
  dialSize = "md",
  ...props
}: RetroKnobProps) {
  const handleSliderChange = (newValue: number[]) => {
    if (onValueChange) onValueChange(newValue[0]);
  };

  const rotation = ((value - min) / (max - min)) * 270 - 135;
  
  const dialSizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)} {...props}>
      <div 
        className={cn(
          dialSizes[dialSize], 
          "rounded-full bg-gradient-to-b from-gray-700 to-gray-900 relative border-4 border-gray-800 shadow-lg"
        )}
      >
        <div 
          className="absolute inset-0 rounded-full shadow-inner overflow-hidden flex items-center justify-center"
          style={{ 
            backgroundImage: "radial-gradient(circle, rgba(40, 40, 40, 1) 0%, rgba(20, 20, 20, 1) 80%, rgba(10, 10, 10, 1) 100%)" 
          }}
        >
          <div 
            className="h-1/2 w-1 bg-gold absolute bottom-1/2"
            style={{ 
              transformOrigin: "bottom center",
              transform: `translateY(-2px) rotate(${rotation}deg)`,
              transition: "transform 0.2s ease-out"
            }}
          />
          <div className="absolute rounded-full w-3 h-3 bg-gray-900 border border-gray-700" />
        </div>
      </div>
      
      <Slider
        className="w-20 opacity-0 absolute cursor-pointer"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={handleSliderChange}
      />
      
      {label && (
        <div className="text-xs uppercase tracking-wider text-gray-400 font-mono mt-1">
          {label}
        </div>
      )}
    </div>
  );
}
