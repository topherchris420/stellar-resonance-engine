
import { Button } from "@/components/ui/button";
import { ChartData } from "@/pages/Index";
import { RetroToggle } from "@/components/ui/retro-toggle";

interface ModularFlowEngineProps {
  activeModule: 'stellar' | 'archetype' | 'tones' | 'cymatic' | 'oracle';
  onModuleChange: (module: 'stellar' | 'archetype' | 'tones' | 'cymatic' | 'oracle') => void;
  chartData: ChartData;
}

export const ModularFlowEngine = ({ activeModule, onModuleChange, chartData }: ModularFlowEngineProps) => {
  const modules = [
    { id: 'stellar' as const, name: 'STELLAR MAP', icon: '✨', color: 'gold' },
    { id: 'archetype' as const, name: 'ARCHETYPE', icon: '🔮', color: 'magenta' },
    { id: 'tones' as const, name: 'RESONANT TONES', icon: '🎵', color: 'aqua' },
    { id: 'cymatic' as const, name: 'CYMATIC VISION', icon: '🌀', color: 'blue' },
    { id: 'oracle' as const, name: 'LIVING ORACLE', icon: '👁️', color: 'green' }
  ];

  return (
    <div className="mb-8 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg">
      <div className="text-center mb-6 font-mono">
        <h2 className="text-xl font-bold text-gold mb-2">
          DR-70 CELESTIAL PROCESSOR
        </h2>
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-400">SUBJECT:</span>
          <span className="text-white bg-black px-2 border border-gray-700">{chartData.birthData.name}</span>
        </div>
        <div className="text-xs text-aqua/80 mt-2">
          {chartData.sunSign} SUN • {chartData.moonSign} MOON • {chartData.risingSign} RISING
        </div>
      </div>
      
      <div className="bg-gray-800 p-3 rounded border border-gray-700 mb-4">
        <div className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-mono">
          MODULE SELECTION MATRIX
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {modules.map((module) => (
            <div key={module.id} className="flex flex-col items-center">
              <RetroToggle
                pressed={activeModule === module.id}
                onClick={() => onModuleChange(module.id)}
                activeColor={module.color as any}
                label={module.name}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center items-center h-8">
        <div className="h-2 w-24 bg-gradient-to-r from-gold via-aqua to-magenta rounded-full shadow-lg shadow-gold/20" />
      </div>
    </div>
  );
};
