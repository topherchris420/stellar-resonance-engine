
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RetroDisplay } from "@/components/ui/retro-display";
import { IndicatorLight } from "@/components/ui/indicator-light";
import { RetroToggle } from "@/components/ui/retro-toggle";
import { CymaticVisualizer } from "@/components/CymaticVisualizer";

interface DailyEnergyData {
  dominantPlanet: string;
  frequency: number;
  energy: string;
  recommendation: string;
  moonPhase: string;
  harmonicTone: number;
}

export const DailyTune = () => {
  const [dailyData, setDailyData] = useState<DailyEnergyData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoTune, setAutoTune] = useState(false);

  const generateDailyReading = () => {
    setIsGenerating(true);
    
    // Simulate cosmic calculation
    setTimeout(() => {
      const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
      const energies = ['Harmony', 'Transformation', 'Manifestation', 'Introspection', 'Action', 'Creativity'];
      const moonPhases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
      
      const today = new Date();
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      
      const data: DailyEnergyData = {
        dominantPlanet: planets[dayOfYear % planets.length],
        frequency: 126.22 + (dayOfYear % 100),
        energy: energies[dayOfYear % energies.length],
        moonPhase: moonPhases[Math.floor(dayOfYear / 4) % moonPhases.length],
        harmonicTone: 432 + (dayOfYear % 64),
        recommendation: generateRecommendation(energies[dayOfYear % energies.length])
      };
      
      setDailyData(data);
      setIsGenerating(false);
    }, 2000);
  };

  const generateRecommendation = (energy: string): string => {
    const recommendations = {
      'Harmony': 'Focus on balance and peaceful relationships today. Meditate to 528Hz.',
      'Transformation': 'Embrace change and release what no longer serves. Journal your insights.',
      'Manifestation': 'Set clear intentions and take concrete steps toward your goals.',
      'Introspection': 'Turn inward for wisdom. Practice mindfulness and self-reflection.',
      'Action': 'Channel your energy into productive activities. Take decisive action.',
      'Creativity': 'Express yourself through art, music, or creative projects today.'
    };
    return recommendations[energy as keyof typeof recommendations] || 'Align with the cosmic flow.';
  };

  useEffect(() => {
    generateDailyReading();
  }, []);

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-700 rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-mono font-bold text-gold">🌙 DAILY COSMIC TUNE-UP</h2>
          <div className="flex items-center space-x-4">
            <RetroToggle 
              pressed={autoTune} 
              onClick={() => setAutoTune(!autoTune)}
              activeColor="aqua"
              label="AUTO-TUNE"
            />
            <Button 
              onClick={generateDailyReading}
              disabled={isGenerating}
              className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-gold border-2 border-gray-600 font-mono"
            >
              {isGenerating ? "SCANNING..." : "REFRESH"}
            </Button>
          </div>
        </div>

        {dailyData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
                <h3 className="text-aqua font-mono mb-3 uppercase tracking-wider">Today's Cosmic Signature</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Dominant Planet:</span>
                    <span className="text-gold font-mono">{dailyData.dominantPlanet}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Moon Phase:</span>
                    <span className="text-aqua font-mono">{dailyData.moonPhase}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Primary Energy:</span>
                    <span className="text-magenta font-mono">{dailyData.energy}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
                <h3 className="text-green-400 font-mono mb-3 uppercase tracking-wider">Resonant Frequencies</h3>
                <div className="flex justify-around">
                  <RetroDisplay 
                    value={dailyData.frequency.toFixed(2)} 
                    label="BASE FREQ" 
                    color="green" 
                  />
                  <RetroDisplay 
                    value={dailyData.harmonicTone} 
                    label="HARMONIC" 
                    color="amber" 
                  />
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
                <h3 className="text-magenta font-mono mb-3 uppercase tracking-wider">Cosmic Guidance</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {dailyData.recommendation}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <CymaticVisualizer 
                chartData={{
                  birthData: { name: 'Daily Tune', birthDate: '', birthTime: '', birthLocation: '' },
                  dominantElement: dailyData.energy,
                  risingSign: '',
                  sunSign: '',
                  moonSign: '',
                  planets: [{
                    name: dailyData.dominantPlanet,
                    sign: dailyData.energy,
                    house: 1,
                    degree: 0,
                    frequency: dailyData.frequency
                  }],
                  archetypes: [dailyData.energy]
                }}
              />
              
              <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
                <h3 className="text-aqua font-mono mb-3 uppercase tracking-wider">Energy Status</h3>
                <div className="flex justify-around">
                  <IndicatorLight active color="green" label="ALIGNED" />
                  <IndicatorLight active color="aqua" label="FLOWING" />
                  <IndicatorLight active color="gold" label="BALANCED" />
                </div>
              </div>
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-aqua font-mono">Scanning cosmic frequencies...</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
