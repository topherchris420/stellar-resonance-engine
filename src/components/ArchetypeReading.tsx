
import { Card } from "@/components/ui/card";
import { ChartData } from "@/pages/Index";

interface ArchetypeReadingProps {
  chartData: ChartData;
}

export const ArchetypeReading = ({ chartData }: ArchetypeReadingProps) => {
  const getArchetypeDescription = (archetype: string) => {
    const descriptions = {
      'Depth Diver': 'You are a soul who swims in the deepest waters of emotion and intuition. Your Scorpio rising calls you to transform through the mysteries of the unconscious.',
      'Creative Fire': 'A radiant force of creative expression burns within you. Your Leo sun illuminates the world with authentic self-expression and generous warmth.',
      'Mystic Healer': 'Your Pisces moon connects you to the cosmic ocean of universal compassion. You heal through empathy and spiritual understanding.'
    };
    return descriptions[archetype as keyof typeof descriptions] || 'A unique cosmic signature awaits your discovery.';
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-magenta mb-2">🔮 Archetype Translator</h3>
        <p className="text-aqua/80">Your cosmic archetypes revealed</p>
      </div>
      
      <div className="space-y-6">
        {chartData.archetypes.map((archetype, index) => (
          <div key={index} className="bg-gradient-to-r from-magenta/20 to-purple-500/20 rounded-lg p-5">
            <h4 className="text-xl font-bold text-magenta mb-3">{archetype}</h4>
            <p className="text-white/90 leading-relaxed">
              {getArchetypeDescription(archetype)}
            </p>
          </div>
        ))}
        
        <div className="bg-white/10 rounded-lg p-5">
          <h4 className="text-lg font-semibold text-gold mb-3">Symbolic Affirmations</h4>
          <div className="space-y-2 text-aqua/90">
            <p>"I embrace the depths of my being with courage and wisdom."</p>
            <p>"My creative fire illuminates the path for others to follow."</p>
            <p>"I channel cosmic compassion into healing presence."</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gold/20 via-aqua/20 to-magenta/20 rounded-lg p-5 text-center">
          <h4 className="text-lg font-semibold text-white mb-2">Your Cosmic Mission</h4>
          <p className="text-white/90">
            To bridge the depths of intuitive wisdom with the radiance of creative expression, 
            healing yourself and others through authentic transformation.
          </p>
        </div>
      </div>
    </Card>
  );
};
