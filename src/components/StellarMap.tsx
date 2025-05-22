
import { Card } from "@/components/ui/card";
import { ChartData } from "@/pages/Index";

interface StellarMapProps {
  chartData: ChartData;
}

export const StellarMap = ({ chartData }: StellarMapProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gold mb-2">✨ Stellar Map Agent</h3>
        <p className="text-aqua/80">Your celestial blueprint decoded</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gold/20 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-gold">Sun Sign</h4>
            <p className="text-2xl">{chartData.sunSign}</p>
          </div>
          <div className="bg-aqua/20 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-aqua">Moon Sign</h4>
            <p className="text-2xl">{chartData.moonSign}</p>
          </div>
        </div>
        
        <div className="bg-magenta/20 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-magenta">Rising Sign</h4>
          <p className="text-2xl">{chartData.risingSign}</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-3">Planetary Positions</h4>
          <div className="space-y-2">
            {chartData.planets.map((planet, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gold">{planet.name}</span>
                <span className="text-aqua">{planet.sign}</span>
                <span className="text-white/60">House {planet.house}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gold/20 via-aqua/20 to-magenta/20 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-white">Dominant Element</h4>
          <p className="text-xl text-aqua">{chartData.dominantElement}</p>
        </div>
      </div>
    </Card>
  );
};
