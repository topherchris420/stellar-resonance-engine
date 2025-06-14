
import { useState } from "react";
import { Header } from "@/components/Header";
import { BirthDataForm } from "@/components/BirthDataForm";
import { StellarMap } from "@/components/StellarMap";
import { ArchetypeReading } from "@/components/ArchetypeReading";
import { ResonantTones } from "@/components/ResonantTones";
import { CymaticVisualizer } from "@/components/CymaticVisualizer";
import { LivingOracle } from "@/components/LivingOracle";
import { ModularFlowEngine } from "@/components/ModularFlowEngine";
import { DustOverlay } from "@/components/DustOverlay";
import { CosmicCalibration } from "@/components/CosmicCalibration";
import { DailyTune } from "@/components/DailyTune";

export interface BirthData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  latitude?: number;
  longitude?: number;
}

export interface ChartData {
  birthData: BirthData;
  dominantElement: string;
  risingSign: string;
  sunSign: string;
  moonSign: string;
  planets: Array<{
    name: string;
    sign: string;
    house: number;
    degree: number;
    frequency: number;
  }>;
  archetypes: string[];
}

const Index = () => {
  const [currentMode, setCurrentMode] = useState<'input' | 'birth-resonance' | 'daily-tune'>('input');
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [activeModule, setActiveModule] = useState<'stellar' | 'archetype' | 'tones' | 'cymatic' | 'oracle'>('stellar');
  const [dustMode, setDustMode] = useState<boolean>(true);
  const [calibrating, setCalibrating] = useState<boolean>(false);
  const [formData, setFormData] = useState<BirthData | null>(null);

  const handleBirthDataSubmit = (data: BirthData) => {
    setFormData(data);
    setCalibrating(true);
  };
  
  const handleCalibrationComplete = () => {
    setCalibrating(false);
    
    if (formData) {
      // Enhanced mock chart data with more realistic calculations
      const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
      const elements = ['Fire', 'Earth', 'Air', 'Water'];
      const archetypeOptions = [
        ['Depth Diver', 'Creative Fire', 'Mystic Healer'],
        ['Earth Keeper', 'Sky Walker', 'Wave Rider'],
        ['Star Seed', 'Moon Child', 'Solar Warrior'],
        ['Dream Weaver', 'Light Bearer', 'Shadow Walker']
      ];
      
      const nameHash = formData.name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      const dateHash = new Date(formData.birthDate).getTime();
      
      const mockChartData: ChartData = {
        birthData: formData,
        dominantElement: elements[nameHash % 4],
        risingSign: signs[(nameHash + dateHash) % 12],
        sunSign: signs[dateHash % 12],
        moonSign: signs[(dateHash + nameHash * 2) % 12],
        planets: [
          { name: 'Sun', sign: signs[dateHash % 12], house: (dateHash % 12) + 1, degree: (dateHash % 30) + 1, frequency: 126.22 + (nameHash % 50) },
          { name: 'Moon', sign: signs[(dateHash + nameHash) % 12], house: ((dateHash + nameHash) % 12) + 1, degree: ((dateHash + nameHash) % 30) + 1, frequency: 210.42 + (nameHash % 40) },
          { name: 'Mercury', sign: signs[(dateHash + 100) % 12], house: ((dateHash + 100) % 12) + 1, degree: ((dateHash + 100) % 30) + 1, frequency: 141.27 + (nameHash % 30) },
          { name: 'Venus', sign: signs[(dateHash + 200) % 12], house: ((dateHash + 200) % 12) + 1, degree: ((dateHash + 200) % 30) + 1, frequency: 221.23 + (nameHash % 60) },
          { name: 'Mars', sign: signs[(dateHash + 300) % 12], house: ((dateHash + 300) % 12) + 1, degree: ((dateHash + 300) % 30) + 1, frequency: 144.72 + (nameHash % 70) }
        ],
        archetypes: archetypeOptions[nameHash % 4]
      };
      
      setChartData(mockChartData);
      setCurrentMode('birth-resonance');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-stars animate-pulse"></div>
      
      {dustMode && <DustOverlay intensity="medium" flickerFrequency="low" />}
      {calibrating && (
        <CosmicCalibration 
          onComplete={handleCalibrationComplete} 
          birthData={formData || undefined}
        />
      )}
      
      <Header 
        currentMode={currentMode} 
        onModeChange={setCurrentMode}
        chartData={chartData}
        dustMode={dustMode}
        onDustModeToggle={() => setDustMode(!dustMode)}
      />

      <main className="relative z-10 container mx-auto px-4 py-4 md:py-8">
        {currentMode === 'input' && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <div className="text-center mb-8 md:mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-gold via-aqua to-magenta bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
                Cosmic Resonance Engine
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-aqua/80 max-w-2xl mx-auto leading-relaxed">
                Translate your celestial blueprint into healing frequencies and sacred wisdom
              </p>
            </div>
            <div className="w-full max-w-6xl">
              <BirthDataForm onSubmit={handleBirthDataSubmit} />
            </div>
          </div>
        )}

        {currentMode === 'birth-resonance' && chartData && (
          <div className="space-y-6 md:space-y-8">
            <ModularFlowEngine 
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              chartData={chartData}
            />
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-6">
                {activeModule === 'stellar' && <StellarMap chartData={chartData} />}
                {activeModule === 'archetype' && <ArchetypeReading chartData={chartData} />}
                {activeModule === 'oracle' && <LivingOracle chartData={chartData} />}
              </div>
              
              <div className="space-y-6">
                {(activeModule === 'tones' || activeModule === 'cymatic') && (
                  <>
                    <ResonantTones chartData={chartData} />
                    <CymaticVisualizer chartData={chartData} />
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {currentMode === 'daily-tune' && (
          <div className="animate-fade-in">
            <DailyTune />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
