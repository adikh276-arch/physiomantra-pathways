import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Upload, FileCheck } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const qualifications = ['BPT', 'MPT', 'PhD', 'DPT', 'Other'];
const specializations = [
  'Orthopedic', 'Sports', 'Neuro', 'Pediatric', 'Geriatric',
  "Women's Health", 'Cardiac', 'Pain Management', 'Manual Therapy'
];
const cities = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Flexible'];

const VerificationPathway = () => {
  const [uploaded, setUploaded] = useState(false);
  const [qualification, setQualification] = useState('');
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [sessions, setSessions] = useState([25]);

  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleUpload = () => {
    setUploaded(true);
    toast.success('License uploaded successfully!');
  };

  const toggleItem = (item: string, list: string[], setList: (items: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleComplete = () => {
    if (!uploaded || !qualification || selectedSpecs.length === 0 || !city) {
      toast.error('Please complete all required fields');
      return;
    }
    completePathway('layer1', 'verification');
    toast.success('License submitted for review');
    navigate('/layer1/how-it-works');
  };

  return (
    <PathwayLayout
      title="Profile Verification"
      layerNumber={1}
      pathwayNumber={2}
      onComplete={handleComplete}
      completeButtonText="Complete Verification"
    >
      <div className="space-y-8">
        <p className="text-muted-foreground">
          Verified profiles get higher visibility and patient priority on MantraCare.
        </p>

        {/* License Upload */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">1. Upload License</Label>
          <p className="text-sm text-muted-foreground">State physiotherapy council registration</p>
          <div className="flex gap-3">
            <Input type="file" className="flex-1" disabled={uploaded} />
            <Button onClick={handleUpload} disabled={uploaded} variant={uploaded ? 'outline' : 'default'}>
              {uploaded ? <FileCheck className="w-4 h-4 mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
              {uploaded ? 'Uploaded' : 'Upload'}
            </Button>
          </div>
        </div>

        {/* Qualification */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">2. Qualification</Label>
          <Select value={qualification} onValueChange={setQualification}>
            <SelectTrigger>
              <SelectValue placeholder="Select your qualification" />
            </SelectTrigger>
            <SelectContent>
              {qualifications.map(q => (
                <SelectItem key={q} value={q}>{q}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Specializations */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">3. Specializations (select multiple)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {specializations.map(spec => (
              <div
                key={spec}
                className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedSpecs.includes(spec)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => toggleItem(spec, selectedSpecs, setSelectedSpecs)}
              >
                <Checkbox checked={selectedSpecs.includes(spec)} />
                <span className="text-sm">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Languages */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">4. Location & Languages</Label>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">City</Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Languages</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {languages.map(lang => (
                  <button
                    key={lang}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      selectedLangs.includes(lang)
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleItem(lang, selectedLangs, setSelectedLangs)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">5. Weekly Availability</Label>
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Days</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {days.map(day => (
                  <button
                    key={day}
                    type="button"
                    className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                      selectedDays.includes(day)
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleItem(day, selectedDays, setSelectedDays)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Time</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                      selectedTimes.includes(time)
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleItem(time, selectedTimes, setSelectedTimes)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm text-muted-foreground">Sessions/week</Label>
                <span className="text-lg font-bold text-primary">{sessions[0]}</span>
              </div>
              <Slider
                value={sessions}
                onValueChange={setSessions}
                min={5}
                max={50}
                step={5}
              />
            </div>
          </div>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default VerificationPathway;
