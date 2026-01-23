import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import { Trophy, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const BecomeMentor = () => {
    const { completePathway } = useProgress();
    const navigate = useNavigate();

    const handleComplete = () => {
        completePathway('layer6', 'becomeMentor');
        toast.success('Welcome to the Mentor Program!');
        navigate('/layer6/mentor-assignment');
    };

    return (
        <PathwayLayout
            title="Become a Mentor"
            layerNumber={6}
            pathwayNumber={1}
            onComplete={handleComplete}
            completeButtonText="Opt-in as Mentor"
        >
            <div className="space-y-8">

                {/* Eligibility Banner */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-primary">Eligibility Requirements</h4>
                        <p className="text-sm text-muted-foreground">To become a mentor, you need one of the following:</p>
                        <ul className="text-sm list-disc list-inside mt-1 text-muted-foreground">
                            <li>50+ completed sessions</li>
                            <li>Specialist verified</li>
                            <li>Trust Score &gt; 85</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Mentor Benefits</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { icon: TrendingUp, text: "Earn per intern session" },
                            { icon: ShieldCheck, text: "Build leadership credibility" },
                            { icon: Users, text: "Get priority for corporates" },
                            { icon: Trophy, text: "Influence clinical quality" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 border rounded-lg bg-card">
                                <item.icon className="w-5 h-5 text-primary" />
                                <span className="font-medium text-sm">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6 pt-4 border-t">
                    <h3 className="font-semibold">Mentorship Preferences</h3>

                    <div className="space-y-3">
                        <Label>Select areas of mentorship</Label>
                        <div className="flex gap-4 flex-wrap">
                            {['Ortho', 'Sports', 'Neuro', 'Geriatric', 'Pediatric'].map((area) => (
                                <div key={area} className="flex items-center space-x-2">
                                    <Checkbox id={area} />
                                    <Label htmlFor={area} className="font-normal">{area}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2 max-w-xs">
                        <Label>Max Interns to Manage</Label>
                        <Select defaultValue="3">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 Intern</SelectItem>
                                <SelectItem value="2">2 Interns</SelectItem>
                                <SelectItem value="3">3 Interns</SelectItem>
                                <SelectItem value="5">5 Interns</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

            </div>
        </PathwayLayout>
    );
};

export default BecomeMentor;
