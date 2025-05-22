
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { BirthData } from "@/pages/Index";
import { RetroToggle } from "@/components/ui/retro-toggle";
import { RetroKnob } from "@/components/ui/retro-knob";
import { PunchedCard } from "@/components/ui/punched-card";
import { IndicatorLight } from "@/components/ui/indicator-light";
import { RetroDisplay } from "@/components/ui/retro-display";

interface BirthDataFormProps {
  onSubmit: (data: BirthData) => void;
}

export const BirthDataForm = ({ onSubmit }: BirthDataFormProps) => {
  const [formData, setFormData] = useState<BirthData>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthLocation: ''
  });
  const [processingStep, setProcessingStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate vintage computer processing with sequential indicator lights
    let step = 0;
    const interval = setInterval(() => {
      setProcessingStep(step);
      step++;
      
      if (step > 5) {
        clearInterval(interval);
        onSubmit(formData);
        setIsProcessing(false);
      }
    }, 500);
  };

  return (
    <Card className="w-full max-w-4xl bg-gray-900 border-gray-700 rounded-lg p-6 shadow-xl relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-aqua/10 rounded-full blur-3xl"></div>
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gold mb-2">
          DIGICOMP DR-70 ASTROCOSMIC PROCESSOR
        </h2>
        <p className="text-aqua/80 text-sm font-mono uppercase tracking-wide">
          Model C-137 • Celestial Data Acquisition System
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5 bg-gray-800/50 p-4 rounded-md border border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-mono uppercase tracking-wider text-aqua">Input Parameters</h3>
              <div className="flex space-x-1.5">
                <IndicatorLight active={isProcessing && processingStep >= 0} color="red" blinking={processingStep === 0} />
                <IndicatorLight active={isProcessing && processingStep >= 1} color="amber" blinking={processingStep === 1} />
                <IndicatorLight active={isProcessing && processingStep >= 2} color="green" blinking={processingStep === 2} />
              </div>
            </div>
            
            <div>
              <Label htmlFor="name" className="text-white/90 font-mono text-xs uppercase">Cosmic Identity</Label>
              <div className="flex items-center space-x-2">
                <RetroToggle activeColor="green" pressed={!!formData.name} />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-black border-gray-700 text-white font-mono placeholder:text-white/30"
                  placeholder="ENTER NAME"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="birthDate" className="text-white/90 font-mono text-xs uppercase">Temporal Coordinates</Label>
              <div className="flex items-center space-x-2">
                <RetroToggle activeColor="aqua" pressed={!!formData.birthDate} />
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                  className="bg-black border-gray-700 text-white font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="birthTime" className="text-white/90 font-mono text-xs uppercase">Chronometric Index</Label>
              <div className="flex items-center space-x-2">
                <RetroToggle activeColor="blue" pressed={!!formData.birthTime} />
                <Input
                  id="birthTime"
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthTime: e.target.value }))}
                  className="bg-black border-gray-700 text-white font-mono"
                  placeholder="For precise rising sign"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="birthLocation" className="text-white/90 font-mono text-xs uppercase">Geospatial Reference</Label>
              <div className="flex items-center space-x-2">
                <RetroToggle activeColor="gold" pressed={!!formData.birthLocation} />
                <Input
                  id="birthLocation"
                  type="text"
                  value={formData.birthLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthLocation: e.target.value }))}
                  className="bg-black border-gray-700 text-white font-mono placeholder:text-white/30"
                  placeholder="CITY, COUNTRY"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col space-y-4">
              <PunchedCard title="COSMIC CALIBRATION MATRIX">
                <div className="grid grid-cols-2 gap-1">
                  <span>SUN SIGN:</span><span className="font-bold">CALCULATING</span>
                  <span>MOON PHASE:</span><span className="font-bold">CALCULATING</span>
                  <span>ASCENDANT:</span><span className="font-bold">CALCULATING</span>
                  <span>DOM ELEMENT:</span><span className="font-bold">ANALYZING</span>
                </div>
              </PunchedCard>
              
              <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
                <h3 className="text-sm font-mono uppercase tracking-wider text-aqua mb-4">Resonance Calibration</h3>
                
                <div className="flex flex-wrap justify-around gap-4">
                  <RetroKnob 
                    value={75} 
                    label="SOLAR FREQ" 
                    dialSize="sm"
                    onValueChange={(v) => console.log("Solar freq:", v)}
                  />
                  <RetroKnob 
                    value={30} 
                    label="LUNAR PHASE" 
                    dialSize="sm"
                    onValueChange={(v) => console.log("Lunar phase:", v)}
                  />
                  <RetroKnob 
                    value={50} 
                    label="RESONANCE" 
                    dialSize="sm"
                    onValueChange={(v) => console.log("Resonance:", v)}
                  />
                </div>
                
                <div className="flex justify-between mt-4">
                  <RetroDisplay value={126.22} label="BASE FREQ" color="green" />
                  <RetroDisplay value={isProcessing ? processingStep : 0} label="STATUS" color="amber" digits={1} />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700 flex items-center justify-between">
              <div className="flex space-x-3">
                <IndicatorLight active={isProcessing && processingStep >= 3} color="aqua" blinking={processingStep === 3} label="DATA" />
                <IndicatorLight active={isProcessing && processingStep >= 4} color="gold" blinking={processingStep === 4} label="CALC" />
                <IndicatorLight active={isProcessing && processingStep >= 5} color="green" blinking={processingStep === 5} label="READY" />
              </div>
              
              <Button 
                type="submit" 
                disabled={isProcessing}
                className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-gold border-2 border-gray-600 font-mono uppercase tracking-wider py-5 px-8"
              >
                {isProcessing ? "PROCESSING..." : "INITIATE COSMIC SCAN"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};
