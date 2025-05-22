
import { useState } from "react";
import { Header } from "@/components/Header";
import { BirthDataForm } from "@/components/BirthDataForm";
import { StellarMap } from "@/components/StellarMap";
import { ArchetypeReading } from "@/components/ArchetypeReading";
import { ResonantTones } from "@/components/ResonantTones";
import { CymaticVisualizer } from "@/components/CymaticVisualizer";
import { LivingOracle } from "@/components/LivingOracle";
import { ModularFlowEngine } from "@/components/ModularFlowEngine";

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

  const handleBirthDataSubmit = (data: BirthData) => {
    // In a real app, this would calculate actual natal chart
    const mockChartData: ChartData = {
      birthData: data,
      dominantElement: 'Water',
      risingSign: 'Scorpio',
      sunSign: 'Leo',
      moonSign: 'Pisces',
      planets: [
        { name: 'Sun', sign: 'Leo', house: 10, degree: 15, frequency: 126.22 },
        { name: 'Moon', sign: 'Pisces', house: 5, degree: 28, frequency: 210.42 },
        { name: 'Mercury', sign: 'Virgo', house: 11, degree: 8, frequency: 141.27 },
        { name: 'Venus', sign: 'Cancer', house: 9, degree: 22, frequency: 221.23 },
        { name: 'Mars', sign: 'Aries', house: 6, degree: 3, frequency: 144.72 }
      ],
      archetypes: ['Depth Diver', 'Creative Fire', 'Mystic Healer']
    };
    
    setChartData(mockChartData);
    setCurrentMode('birth-resonance');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-stars animate-pulse"></div>
      
      <Header 
        currentMode={currentMode} 
        onModeChange={setCurrentMode}
        chartData={chartData}
      />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {currentMode === 'input' && (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gold via-aqua to-magenta bg-clip-text text-transparent mb-6">
                Cosmic Resonance Engine
              </h1>
              <p className="text-xl md:text-2xl text-aqua/80 max-w-2xl mx-auto">
                Translate your celestial blueprint into healing frequencies and sacred wisdom
              </p>
            </div>
            <BirthDataForm onSubmit={handleBirthDataSubmit} />
          </div>
        )}

        {currentMode === 'birth-resonance' && chartData && (
          <div className="space-y-8">
            <ModularFlowEngine 
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              chartData={chartData}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="text-center animate-fade-in">
              <h2 className="text-4xl font-bold text-gold mb-4">Daily Cosmic Tune-Up</h2>
              <p className="text-aqua/80 mb-8">Align with today's celestial energies</p>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <p className="text-lg">Coming soon... Today's planetary frequencies await you</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
