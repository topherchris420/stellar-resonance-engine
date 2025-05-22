
import * as React from "react";
import { cn } from "@/lib/utils";

interface SegmentDisplayProps {
  value: string;
  className?: string;
}

interface RetroDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label?: string;
  color?: "amber" | "green" | "red";
  digits?: number;
}

const SegmentDisplay = ({ value, className }: SegmentDisplayProps) => {
  const char = value.toString()[0] || " ";
  
  return (
    <div className={cn("font-mono font-bold text-center", className)}>
      {char}
    </div>
  );
};

export function RetroDisplay({
  className,
  value,
  label,
  color = "amber",
  digits = 4,
  ...props
}: RetroDisplayProps) {
  const displayText = value.toString().padStart(digits, " ").slice(0, digits);
  
  const colorClasses = {
    amber: "bg-amber-900/20 text-amber-500",
    green: "bg-green-900/20 text-green-500",
    red: "bg-red-900/20 text-red-500",
  };
  
  return (
    <div className={cn("flex flex-col items-center", className)} {...props}>
      <div 
        className={cn(
          "border-2 border-gray-700 rounded-sm bg-black px-2 py-1",
          "shadow-inner overflow-hidden"
        )}
      >
        <div className={cn(
          "flex gap-0.5",
          colorClasses[color]
        )}>
          {Array.from(displayText).map((char, i) => (
            <SegmentDisplay key={i} value={char} className="w-5" />
          ))}
        </div>
      </div>
      
      {label && (
        <span className="text-xs uppercase tracking-wider text-gray-400 mt-1">
          {label}
        </span>
      )}
    </div>
  );
}
