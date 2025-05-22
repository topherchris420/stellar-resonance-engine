
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { ChartData } from "@/pages/Index";

interface CymaticVisualizerProps {
  chartData: ChartData;
}

export const CymaticVisualizer = ({ chartData }: CymaticVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(26, 27, 75, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Create sacred geometry patterns based on planetary frequencies
      chartData.planets.forEach((planet, index) => {
        const frequency = planet.frequency / 100; // Scale down for visualization
        const radius = 80 + index * 20;
        const sides = 6 + index; // Hexagon to dodecagon
        
        ctx.beginPath();
        ctx.strokeStyle = getColorForPlanet(planet.name, time + index);
        ctx.lineWidth = 2;
        
        for (let i = 0; i <= sides; i++) {
          const angle = (i / sides) * Math.PI * 2 + time * frequency * 0.01;
          const x = centerX + Math.cos(angle) * radius * (1 + Math.sin(time * frequency * 0.02) * 0.1);
          const y = centerY + Math.sin(angle) * radius * (1 + Math.cos(time * frequency * 0.03) * 0.1);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Add pulsing center point
        const pulseRadius = 5 + Math.sin(time * frequency * 0.05) * 3;
        ctx.beginPath();
        ctx.fillStyle = getColorForPlanet(planet.name, time);
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add particle system
      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2 + time * 0.01;
        const distance = 150 + Math.sin(time * 0.02 + i) * 50;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(125, 211, 252, ${0.3 + Math.sin(time * 0.03 + i) * 0.2})`;
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 1;

      if (isAnimating) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [chartData, isAnimating]);

  const getColorForPlanet = (planetName: string, time: number) => {
    const colors = {
      Sun: `rgba(255, 215, 0, ${0.5 + Math.sin(time * 0.02) * 0.3})`,
      Moon: `rgba(125, 211, 252, ${0.5 + Math.sin(time * 0.03) * 0.3})`,
      Mercury: `rgba(244, 114, 182, ${0.5 + Math.sin(time * 0.04) * 0.3})`,
      Venus: `rgba(34, 197, 94, ${0.5 + Math.sin(time * 0.025) * 0.3})`,
      Mars: `rgba(239, 68, 68, ${0.5 + Math.sin(time * 0.035) * 0.3})`
    };
    return colors[planetName as keyof typeof colors] || `rgba(255, 255, 255, 0.5)`;
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-indigo-400 mb-2">🌀 Cymatic Visualizer</h3>
        <p className="text-aqua/80">Sacred geometry born from your cosmic frequencies</p>
      </div>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="border border-white/20 rounded-lg bg-gradient-to-br from-slate-950 to-indigo-950"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 rounded-lg pointer-events-none"></div>
        </div>
        
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 rounded-lg text-indigo-400 transition-colors"
        >
          {isAnimating ? 'Pause' : 'Resume'} Animation
        </button>
        
        <div className="text-center max-w-sm">
          <p className="text-white/70 text-sm">
            This mandala reflects your planetary frequencies as geometric patterns, 
            creating a unique visual representation of your cosmic resonance.
          </p>
        </div>
      </div>
    </Card>
  );
};
