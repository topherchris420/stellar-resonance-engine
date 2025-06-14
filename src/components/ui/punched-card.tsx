
import * as React from "react";
import { cn } from "@/lib/utils";

interface PunchedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  rows?: number;
  columns?: number;
  pattern?: boolean[][];
}

export function PunchedCard({
  className,
  title,
  rows = 5,
  columns = 12,
  pattern,
  children,
  ...props
}: PunchedCardProps) {
  // Generate random pattern if none provided
  const displayPattern = React.useMemo(() => {
    if (pattern) return pattern;
    
    const randomPattern: boolean[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: boolean[] = [];
      for (let j = 0; j < columns; j++) {
        row.push(Math.random() > 0.7);
      }
      randomPattern.push(row);
    }
    return randomPattern;
  }, [pattern, rows, columns]);

  return (
    <div 
      className={cn(
        "bg-amber-100 border-4 border-amber-200 rounded-md p-3 shadow-md",
        "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {title && (
        <div className="bg-amber-200 -mx-3 -mt-3 mb-3 py-1 px-3 font-mono text-amber-900 uppercase tracking-wider text-xs border-b-2 border-amber-300">
          {title}
        </div>
      )}
      
      <div className="grid grid-cols-12 gap-1 mb-3">
        {displayPattern.map((row, rowIndex) => 
          row.map((isPunched, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "aspect-square rounded-sm border border-amber-300",
                isPunched ? "bg-amber-900/80" : "bg-amber-50"
              )}
            />
          ))
        )}
      </div>
      
      <div className="font-mono text-amber-900 text-xs">
        {children}
      </div>
    </div>
  );
}
