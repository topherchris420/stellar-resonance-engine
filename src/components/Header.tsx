
import { Button } from "@/components/ui/button";
import { ChartData } from "@/pages/Index";

interface HeaderProps {
  currentMode: 'input' | 'birth-resonance' | 'daily-tune';
  onModeChange: (mode: 'input' | 'birth-resonance' | 'daily-tune') => void;
  chartData: ChartData | null;
}

export const Header = ({ currentMode, onModeChange, chartData }: HeaderProps) => {
  return (
    <header className="relative z-20 p-6 backdrop-blur-lg bg-white/5 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-r from-gold to-aqua rounded-full animate-pulse"></div>
          <span className="text-xl font-semibold text-gold">Cosmic Resonance</span>
        </div>
        
        <nav className="flex items-center space-x-4">
          <Button
            variant={currentMode === 'input' ? 'default' : 'ghost'}
            onClick={() => onModeChange('input')}
            className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
          >
            New Reading
          </Button>
          
          {chartData && (
            <Button
              variant={currentMode === 'birth-resonance' ? 'default' : 'ghost'}
              onClick={() => onModeChange('birth-resonance')}
              className="bg-gold/20 hover:bg-gold/30 border-gold/30 text-gold"
            >
              Birth Resonance
            </Button>
          )}
          
          <Button
            variant={currentMode === 'daily-tune' ? 'default' : 'ghost'}
            onClick={() => onModeChange('daily-tune')}
            className="bg-aqua/20 hover:bg-aqua/30 border-aqua/30 text-aqua"
          >
            Daily Tune-Up
          </Button>
        </nav>
      </div>
    </header>
  );
};
