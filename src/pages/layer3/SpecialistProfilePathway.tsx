import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const specialties = [
  'Sports Physiotherapy',
  'Orthopedic Physiotherapy',
  'Neurological Physiotherapy',
  'Pediatric Physiotherapy',
  'Geriatric Physiotherapy',
  'Cardiopulmonary Physiotherapy',
  'Women\'s Health',
  'Pain Management',
];

const SpecialistProfilePathway = () => {
  const [specialty, setSpecialty] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleUpload = () => {
    setUploaded(true);
    toast.success('MPT degree uploaded!');
  };

  const handleComplete = () => {
    if (!specialty) {
      toast.error('Please select a specialty');
      return;
    }
    completePathway('layer3', 'specialistProfile');
    toast.success('Specialist profile submitted for verification!');
    navigate('/');
  };

  return (
    <PathwayLayout
      title="Specialist Profile"
      layerNumber={3}
      pathwayNumber={3}
      onComplete={handleComplete}
      completeButtonText="Submit for Verification"
    >
      <div className="space-y-6">
        {/* Step 1 */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Step 1: Select Specialty</Label>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger>
              <SelectValue placeholder="Choose specialty..." />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Step 2 */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Step 2: Submit Credentials</Label>
          <p className="text-sm text-muted-foreground">Upload MPT degree</p>
          <div className="flex gap-3">
            <Input type="file" className="flex-1" disabled={uploaded} />
            <Button onClick={handleUpload} disabled={uploaded}>
              <Upload className="w-4 h-4 mr-2" />
              {uploaded ? 'Uploaded' : 'Upload'}
            </Button>
          </div>
          {uploaded && (
            <p className="text-sm text-success">✓ File uploaded successfully</p>
          )}
        </div>
      </div>
    </PathwayLayout>
  );
};

export default SpecialistProfilePathway;
