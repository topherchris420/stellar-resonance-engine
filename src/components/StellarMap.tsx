
import { Card } from "@/components/ui/card";
import { ChartData } from "@/pages/Index";
import { RetroDisplay } from "@/components/ui/retro-display";
import { IndicatorLight } from "@/components/ui/indicator-light";

interface StellarMapProps {
  chartData: ChartData;
}

export const StellarMap = ({ chartData }: StellarMapProps) => {
  return (
    <Card className="bg-gray-900 border-gray-700 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
        <h3 className="text-lg font-mono font-bold text-gold">✨ STELLAR MAP AGENT</h3>
        <div className="flex space-x-2">
          <IndicatorLight active color="green" />
          <IndicatorLight active color="amber" blinking />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="retro-grid bg-gray-800/50 p-2 rounded border border-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/70 rounded p-3 border border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-6 h-6 bg-gold/10 rounded-full blur-lg"></div>
              <div className="text-xs font-mono text-gray-400 mb-1">SUN SIGN</div>
              <div className="text-2xl font-mono text-gold">{chartData.sunSign}</div>
            </div>
            <div className="bg-black/70 rounded p-3 border border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-6 h-6 bg-aqua/10 rounded-full blur-lg"></div>
              <div className="text-xs font-mono text-gray-400 mb-1">MOON SIGN</div>
              <div className="text-2xl font-mono text-aqua">{chartData.moonSign}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-black/70 rounded p-3 border border-gray-700 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-10 h-10 bg-magenta/10 rounded-full blur-lg"></div>
          <div className="text-xs font-mono text-gray-400 mb-1">RISING SIGN</div>
          <div className="text-2xl font-mono text-magenta">{chartData.risingSign}</div>
        </div>
        
        <div className="retro-grid bg-gray-800/50 p-3 rounded border border-gray-700">
          <div className="text-xs font-mono text-gray-400 mb-2">PLANETARY POSITIONS</div>
          <table className="w-full border-separate border-spacing-1">
            <thead>
              <tr className="text-xs font-mono text-gray-500">
                <th className="text-left">PLANET</th>
                <th className="text-left">SIGN</th>
                <th className="text-right">HOUSE</th>
                <th className="text-right">FREQ (Hz)</th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {chartData.planets.map((planet, index) => (
                <tr key={index}>
                  <td className="text-gold">{planet.name}</td>
                  <td className="text-aqua">{planet.sign}</td>
                  <td className="text-right text-white/60">{planet.house}</td>
                  <td className="text-right text-green-400">{planet.frequency.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between">
          <RetroDisplay value="WATER" color="amber" label="DOMINANT ELEMENT" />
          <div className="flex space-x-1">
            {["W", "E", "F", "A"].map((element, i) => (
              <div 
                key={i}
                className={`
                  w-6 h-6 flex items-center justify-center 
                  font-mono text-xs border border-gray-700 
                  ${element === "W" ? "bg-aqua/20 text-aqua" : "bg-black/70 text-gray-500"}
                `}
              >
                {element}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
