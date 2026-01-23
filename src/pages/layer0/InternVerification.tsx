import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import { Check } from 'lucide-react';

const InternVerification = () => {
    const { completePathway } = useProgress();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);

    const handleComplete = () => {
        if (!file) {
            toast.error('Please upload your college ID or internship letter');
            return;
        }
        completePathway('layer0', 'verification');
        toast.success('Verification submitted for manual approval');
        navigate('/layer0/how-it-works');
    };

    return (
        <PathwayLayout
            title="Intern Verification"
            layerNumber={0}
            pathwayNumber={2}
            onComplete={handleComplete}
            completeButtonText="Submit for Approval"
        >
            <div className="space-y-8">
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label>College / University</Label>
                        <Input placeholder="Enter your college name" />
                    </div>

                    <div className="space-y-2">
                        <Label>Year of Study</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="final">Final Year BPT</SelectItem>
                                <SelectItem value="intern">Internship</SelectItem>
                                <SelectItem value="grad">Fresh Graduate</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Areas of Interest</Label>
                        <Input placeholder="e.g. Ortho, Sports, Neuro" />
                    </div>

                    <div className="space-y-2">
                        <Label>Upload College ID / Internship Letter</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                            {file ? (
                                <div className="text-success flex items-center justify-center gap-2">
                                    <Check className="w-4 h-4" />
                                    {file.name}
                                </div>
                            ) : (
                                <div className="text-muted-foreground">
                                    <span className="text-primary font-medium">Click to upload</span> or drag and drop
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold text-sm">Rules & Guidelines</h4>
                    <ul className="space-y-2">
                        {[
                            "You can deliver care under mentor supervision",
                            "You will NOT claim independent expertise",
                            "Pricing is lower for patients",
                            "Feedback is mandatory"
                        ].map((rule, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="w-4 h-4 text-success" />
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </PathwayLayout>
    );
};

export default InternVerification;
