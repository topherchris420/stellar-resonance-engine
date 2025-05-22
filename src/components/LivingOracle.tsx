
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChartData } from "@/pages/Index";

interface LivingOracleProps {
  chartData: ChartData;
}

export const LivingOracle = ({ chartData }: LivingOracleProps) => {
  const [currentReading, setCurrentReading] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [readingType, setReadingType] = useState<'mystical' | 'scientific' | 'artistic'>('mystical');

  const generateReading = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with cosmic wisdom
    const readings = {
      mystical: `Beloved ${chartData.birthData.name}, the cosmic tapestry speaks...

Your ${chartData.sunSign} Sun burns with the eternal flame of creative purpose, while your ${chartData.moonSign} Moon flows through the dreamscape of infinite possibility. The ${chartData.risingSign} rising through your earthly vessel calls you to embody transformation itself.

The planets whisper secrets: Mercury dances in harmonious frequencies at ${chartData.planets.find(p => p.name === 'Mercury')?.frequency.toFixed(2)} Hz, attuning your voice to cosmic truth. Venus resonates at ${chartData.planets.find(p => p.name === 'Venus')?.frequency.toFixed(2)} Hz, opening your heart to universal love.

Your soul's mission in this incarnation: To bridge the realms of depth and light, to heal through the alchemy of authentic expression. The ${chartData.dominantElement} element flows strongest through your being, blessing you with the power to transform emotional depths into radiant wisdom.

Trust the cosmic currents, dear one. Your time of greatest flowering approaches as the stars align with your heart's true calling.`,

      scientific: `Based on your astrological configuration, ${chartData.birthData.name}, we observe distinct energetic patterns:

Solar Position (${chartData.sunSign}): Primary frequency resonance at ${chartData.planets.find(p => p.name === 'Sun')?.frequency.toFixed(2)} Hz correlates with leadership and self-expression amplification.

Lunar Aspect (${chartData.moonSign}): Emotional processing frequency at ${chartData.planets.find(p => p.name === 'Moon')?.frequency.toFixed(2)} Hz indicates heightened intuitive receptivity and emotional intelligence.

Ascendant Configuration (${chartData.risingSign}): Interface frequency suggests optimal environmental resonance with transformative experiences and deep psychological work.

Elemental Distribution: ${chartData.dominantElement} dominance creates a natural affinity for emotional depth, creative flow, and spiritual transcendence. This suggests enhanced neuroplasticity in areas related to empathy and artistic expression.

Recommended frequency therapy: Combine your planetary tones in 7-minute cycles for optimal cellular resonance and psychological integration.`,

      artistic: `In the gallery of stars, ${chartData.birthData.name}, you are a masterpiece in motion...

Like a canvas painted with liquid starlight, your ${chartData.sunSign} Sun creates bold strokes of golden confidence across the cosmic sky. Each ray carries the frequency of ${chartData.planets.find(p => p.name === 'Sun')?.frequency.toFixed(2)} Hz - the exact vibration of creative courage.

Your ${chartData.moonSign} Moon moves like silver poetry through the night of consciousness, weaving dreams at ${chartData.planets.find(p => p.name === 'Moon')?.frequency.toFixed(2)} Hz - the resonance of emotional artistry. Together, they compose a symphony that only your soul can hear.

The ${chartData.risingSign} rising paints your edges with mystery, each interaction a brushstroke that transforms both you and those you touch. Your dominant ${chartData.dominantElement} element flows like ink through water, creating beautiful chaos that resolves into profound meaning.

You are the artist and the art, the song and the singer, the dance and the dancer in this cosmic performance we call existence.`
    };

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentReading(readings[readingType]);
    setIsGenerating(false);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-emerald-400 mb-2">👁️ Living Oracle Agent</h3>
        <p className="text-aqua/80">Channel cosmic wisdom through AI consciousness</p>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-center space-x-4">
          {(['mystical', 'scientific', 'artistic'] as const).map((type) => (
            <Button
              key={type}
              variant={readingType === type ? 'default' : 'outline'}
              onClick={() => setReadingType(type)}
              className={`capitalize ${
                readingType === type 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              {type}
            </Button>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            onClick={generateReading}
            disabled={isGenerating}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            {isGenerating ? 'Channeling Cosmic Wisdom...' : 'Receive Oracle Reading'}
          </Button>
        </div>
        
        {currentReading && (
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-lg p-6 border border-emerald-400/30">
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-line text-white/90 leading-relaxed">
                {currentReading}
              </div>
            </div>
          </div>
        )}
        
        {isGenerating && (
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-emerald-400 mt-2">Accessing cosmic consciousness...</p>
          </div>
        )}
      </div>
    </Card>
  );
};
