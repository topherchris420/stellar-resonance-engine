
import { Button } from "@/components/ui/button";
import { ChartData } from "@/pages/Index";
import { RetroToggle } from "@/components/ui/retro-toggle";
import { IndicatorLight } from "@/components/ui/indicator-light";

interface HeaderProps {
  currentMode: 'input' | 'birth-resonance' | 'daily-tune';
  onModeChange: (mode: 'input' | 'birth-resonance' | 'daily-tune') => void;
  chartData: ChartData | null;
  dustMode?: boolean;
  onDustModeToggle?: () => void;
}

export const Header = ({ 
  currentMode, 
  onModeChange, 
  chartData,
  dustMode = true,
  onDustModeToggle
}: HeaderProps) => {
  return (
    <header className="relative z-20 p-3 bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <a href="https://vers3dynamics.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4">
            <div className="w-10 h-10 border-2 border-gold rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/50 to-transparent animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl">⚛</div>
            </div>
            <div>
              <span className="font-mono font-bold text-gold tracking-widest">VERS3DYNAMICS</span>
              <span className="font-mono text-xs text-white/50 block">
                DR-70 ASTROCOSMIC PROCESSOR
              </span>
            </div>
          </a>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 flex items-center gap-4">
          <div className="flex items-center space-x-3">
            <IndicatorLight 
              active={currentMode === 'input'} 
              color="gold" 
              label="NEW"
              className="cursor-pointer"
              onClick={() => onModeChange('input')}
            />
            
            {chartData && (
              <IndicatorLight 
                active={currentMode === 'birth-resonance'} 
                color="aqua" 
                label="NATAL"
                className="cursor-pointer"
                onClick={() => onModeChange('birth-resonance')}
              />
            )}
            
            <IndicatorLight 
              active={currentMode === 'daily-tune'} 
              color="green" 
              label="DAILY"
              className="cursor-pointer"
              onClick={() => onModeChange('daily-tune')}
            />
          </div>
          
          <div className="h-8 border-l border-gray-600"></div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RetroToggle 
                pressed={dustMode} 
                onClick={onDustModeToggle}
                activeColor="amber"
                label="DUST"
              />
            </div>
            
            <div className="font-mono text-xs text-gray-400">
              SYSTEM STATUS: <span className="text-green-500">OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
