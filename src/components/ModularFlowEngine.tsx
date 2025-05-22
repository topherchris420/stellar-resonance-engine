
import { Button } from "@/components/ui/button";
import { ChartData } from "@/pages/Index";

interface ModularFlowEngineProps {
  activeModule: 'stellar' | 'archetype' | 'tones' | 'cymatic' | 'oracle';
  onModuleChange: (module: 'stellar' | 'archetype' | 'tones' | 'cymatic' | 'oracle') => void;
  chartData: ChartData;
}

export const ModularFlowEngine = ({ activeModule, onModuleChange, chartData }: ModularFlowEngineProps) => {
  const modules = [
    { id: 'stellar' as const, name: 'Stellar Map', icon: '✨', color: 'from-gold to-yellow-400' },
    { id: 'archetype' as const, name: 'Archetype', icon: '🔮', color: 'from-magenta to-purple-400' },
    { id: 'tones' as const, name: 'Resonant Tones', icon: '🎵', color: 'from-aqua to-blue-400' },
    { id: 'cymatic' as const, name: 'Cymatic Vision', icon: '🌀', color: 'from-indigo-400 to-purple-600' },
    { id: 'oracle' as const, name: 'Living Oracle', icon: '👁️', color: 'from-emerald-400 to-teal-600' }
  ];

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome, {chartData.birthData.name}
        </h2>
        <p className="text-aqua/80">
          {chartData.sunSign} Sun • {chartData.moonSign} Moon • {chartData.risingSign} Rising
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        {modules.map((module) => (
          <Button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={`
              relative overflow-hidden px-6 py-3 rounded-xl border border-white/20
              ${activeModule === module.id 
                ? `bg-gradient-to-r ${module.color} text-white shadow-lg scale-105` 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
              }
              transition-all duration-300 transform hover:scale-105
            `}
          >
            <span className="mr-2 text-lg">{module.icon}</span>
            {module.name}
            {activeModule === module.id && (
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-xl"></div>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};
