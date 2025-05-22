
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { BirthData } from "@/pages/Index";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gold mb-2">Enter Your Celestial Coordinates</h2>
          <p className="text-aqua/80 text-sm">Birth data creates your unique cosmic signature</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white/90">Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="Your cosmic name"
              required
            />
          </div>

          <div>
            <Label htmlFor="birthDate" className="text-white/90">Birth Date</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
              className="bg-white/10 border-white/20 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="birthTime" className="text-white/90">Birth Time (Optional)</Label>
            <Input
              id="birthTime"
              type="time"
              value={formData.birthTime}
              onChange={(e) => setFormData(prev => ({ ...prev, birthTime: e.target.value }))}
              className="bg-white/10 border-white/20 text-white"
              placeholder="For precise rising sign"
            />
          </div>

          <div>
            <Label htmlFor="birthLocation" className="text-white/90">Birth Location</Label>
            <Input
              id="birthLocation"
              type="text"
              value={formData.birthLocation}
              onChange={(e) => setFormData(prev => ({ ...prev, birthLocation: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="City, Country"
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-gold via-aqua to-magenta hover:from-gold/80 hover:via-aqua/80 hover:to-magenta/80 text-white font-semibold py-3 transition-all duration-300"
        >
          Generate Cosmic Resonance
        </Button>
      </form>
    </Card>
  );
};
