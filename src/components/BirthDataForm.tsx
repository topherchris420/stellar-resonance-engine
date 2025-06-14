
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
import { useSoundEffects } from "@/hooks/useSoundEffects";

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
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const { playButtonClick, playSuccess, playError } = useSoundEffects();

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) errors.push('Cosmic Identity required');
    if (!formData.birthDate) errors.push('Temporal Coordinates required');
    if (!formData.birthLocation.trim()) errors.push('Geospatial Reference required');
    
    // Validate date is not in the future
    if (formData.birthDate && new Date(formData.birthDate) > new Date()) {
      errors.push('Birth date cannot be in the future');
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      playError();
      return;
    }
    
    playButtonClick();
    setIsProcessing(true);
    setValidationErrors([]);
    
    // Enhanced processing with realistic timing
    let step = 0;
    const interval = setInterval(() => {
      setProcessingStep(step);
      step++;
      
      if (step > 5) {
        clearInterval(interval);
        playSuccess();
        onSubmit(formData);
        setIsProcessing(false);
      }
    }, 600);
  };

  const isFieldValid = (fieldName: keyof BirthData): boolean => {
    return !!formData[fieldName] && !validationErrors.some(error => 
      error.toLowerCase().includes(fieldName.toLowerCase())
    );
  };

  return (
    <Card className="w-full bg-gray-900 border-gray-700 rounded-lg p-4 md:p-6 shadow-xl relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-aqua/10 rounded-full blur-3xl"></div>
      
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gold mb-2">
          DIGICOMP DR-70 ASTROCOSMIC PROCESSOR
        </h2>
        <p className="text-aqua/80 text-sm font-mono uppercase tracking-wide">
          Model C-137 • Celestial Data Acquisition System
        </p>
      </div>

      {validationErrors.length > 0 && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-md">
          <div className="text-red-400 font-mono text-sm">
            VALIDATION ERRORS:
            <ul className="mt-1 list-disc list-inside">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
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
                <RetroToggle activeColor="green" pressed={isFieldValid('name')} />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-black border-gray-700 text-white font-mono placeholder:text-white/30 focus:border-gold transition-colors"
                  placeholder="ENTER NAME"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="birthDate" className="text-white/90 font-mono text-xs uppercase">Temporal Coordinates</Label>
              <div className="flex items-center space-x-2">
                <RetroToggle activeColor="aqua" pressed={isFieldValid('birthDate')} />
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                  className="bg-black border-gray-700 text-white font-mono focus:border-aqua transition-colors"
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
                  className="bg-black border-gray-700 text-white font-mono focus:border-blue-400 transition-colors"
                  placeholder="For precise rising sign"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="birthLocation" className="text-white/90 font-mono text-xs uppercase">Geospatial Reference</Label>
              <div className="flex items-center space-x-2">
                <RetroToggle activeColor="gold" pressed={isFieldValid('birthLocation')} />
                <Input
                  id="birthLocation"
                  type="text"
                  value={formData.birthLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthLocation: e.target.value }))}
                  className="bg-black border-gray-700 text-white font-mono placeholder:text-white/30 focus:border-gold transition-colors"
                  placeholder="CITY, COUNTRY"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col space-y-4">
              <PunchedCard title="COSMIC CALIBRATION MATRIX">
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <span>SUN SIGN:</span><span className="font-bold">{isProcessing ? "CALCULATING" : "READY"}</span>
                  <span>MOON PHASE:</span><span className="font-bold">{isProcessing ? "CALCULATING" : "READY"}</span>
                  <span>ASCENDANT:</span><span className="font-bold">{isProcessing ? "CALCULATING" : "READY"}</span>
                  <span>DOM ELEMENT:</span><span className="font-bold">{isProcessing ? "ANALYZING" : "READY"}</span>
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
            
            <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex space-x-3">
                <IndicatorLight active={isProcessing && processingStep >= 3} color="aqua" blinking={processingStep === 3} label="DATA" />
                <IndicatorLight active={isProcessing && processingStep >= 4} color="gold" blinking={processingStep === 4} label="CALC" />
                <IndicatorLight active={isProcessing && processingStep >= 5} color="green" blinking={processingStep === 5} label="READY" />
              </div>
              
              <Button 
                type="submit" 
                disabled={isProcessing}
                className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-gold border-2 border-gray-600 font-mono uppercase tracking-wider py-3 px-6 md:py-5 md:px-8 transition-all duration-200 hover:shadow-glow-sm disabled:opacity-50"
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
