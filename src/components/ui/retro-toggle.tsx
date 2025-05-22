
import * as React from "react";
import { cn } from "@/lib/utils";
import { Toggle, ToggleProps } from "@/components/ui/toggle";

interface RetroToggleProps extends ToggleProps {
  label?: string;
  activeColor?: "red" | "green" | "blue" | "amber" | "aqua" | "gold";
}

const retroColors = {
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  aqua: "bg-cyan-400",
  gold: "bg-yellow-400",
};

export function RetroToggle({
  className,
  variant = "outline",
  size = "default",
  label,
  activeColor = "amber",
  ...props
}: RetroToggleProps) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <Toggle
        variant={variant}
        size={size}
        className={cn(
          "h-10 w-14 rounded-md border-2 border-gray-700 bg-gray-900 shadow-inner relative",
          props.pressed && "border-gray-500",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "transition-all duration-200 ease-in-out"
          )}
        >
          <div
            className={cn(
              "h-4 w-4 rounded-full transition-all",
              props.pressed ? `${retroColors[activeColor]} shadow-glow-sm` : "bg-gray-700"
            )}
          />
        </div>
      </Toggle>
      {label && <span className="text-xs uppercase tracking-wider text-gray-400">{label}</span>}
    </div>
  );
}
