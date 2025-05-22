
import * as React from "react";
import { cn } from "@/lib/utils";

interface IndicatorLightProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  label?: string;
  color?: "red" | "green" | "blue" | "amber" | "aqua" | "gold";
  blinking?: boolean;
}

export function IndicatorLight({
  className,
  active = false,
  label,
  color = "red",
  blinking = false,
  ...props
}: IndicatorLightProps) {
  const colorClasses = {
    red: "bg-red-500 shadow-red-500/50",
    green: "bg-green-500 shadow-green-500/50",
    blue: "bg-blue-500 shadow-blue-500/50",
    amber: "bg-amber-500 shadow-amber-500/50",
    aqua: "bg-cyan-400 shadow-cyan-400/50",
    gold: "bg-yellow-400 shadow-yellow-400/50",
  };

  return (
    <div className="flex flex-col items-center space-y-1" {...props}>
      <div className="w-5 h-5 rounded-full border-2 border-gray-700 bg-gray-800 relative overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-opacity duration-200",
            colorClasses[color],
            active ? "opacity-100" : "opacity-10",
            active && blinking && "animate-pulse"
          )}
        />
      </div>
      {label && (
        <span className="text-[0.65rem] uppercase tracking-wider text-gray-400">
          {label}
        </span>
      )}
    </div>
  );
}
