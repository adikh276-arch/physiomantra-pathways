import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const tips = [
  {
    id: 'gyms',
    title: 'For Gyms',
    icon: '🏋️',
    content: [
      'Partner with local gym trainers - they often see injuries',
      'Offer free ergonomic assessments for gym members',
      'Leave your MantraCare business cards at the front desk',
      'Provide a 10% discount for gym referrals',
    ],
  },
  {
    id: 'societies',
    title: 'For Housing Societies',
    icon: '🏠',
    content: [
      'Conduct free health camps in common areas',
      'Post on society WhatsApp groups about posture tips',
      'Partner with society RWA for wellness programs',
      'Offer group sessions for seniors',
    ],
  },
  {
    id: 'friends',
    title: 'For Friends & Family',
    icon: '👥',
    content: [
      'Share your MantraCare booking link on personal WhatsApp',
      'Ask satisfied patients for word-of-mouth referrals',
      'Share success stories (with permission)',
      'Offer family packages for multiple members',
    ],
  },
  {
    id: 'social',
    title: 'For LinkedIn/Instagram',
    icon: '📱',
    content: [
      'Post weekly health tips with your MantraCare profile',
      'Share patient success stories (anonymized)',
      'Use the LinkedIn banner we provided',
      'Go live for Q&A sessions about common conditions',
    ],
  },
];

const LocalAwarenessPathway = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleComplete = () => {
    completePathway('layer2', 'localAwareness');
    setShowCelebration(true);
  };

  const handleExploreLayer3 = () => {
    setShowCelebration(false);
    navigate('/layer3/invite-physios');
  };

  const handleSkipToLayer4 = () => {
    setShowCelebration(false);
    navigate('/layer4/wellness-partner');
  };

  const handleBackToDashboard = () => {
    setShowCelebration(false);
    toast.success('Layer 2 Complete! You\'re now earning independently.');
    navigate('/');
  };

  return (
    <>
      <PathwayLayout
        title="Local Awareness & Referrals"
        layerNumber={2}
        pathwayNumber={4}
        onComplete={handleComplete}
        completeButtonText="Done - I've read the tips"
      >
        <div className="space-y-6">
          <p className="text-muted-foreground">Simple ways to get more patients:</p>

          <Accordion type="single" collapsible className="space-y-2">
            {tips.map((tip) => (
              <AccordionItem
                key={tip.id}
                value={tip.id}
                className="border border-border rounded-xl px-4 data-[state=open]:bg-primary/5"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="text-xl">{tip.icon}</span>
                    <span className="font-medium">{tip.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-9 pb-2">
                    {tip.content.map((item, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </PathwayLayout>

      {/* Layer 2 Complete Modal */}
      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full gradient-accent flex items-center justify-center mb-4">
              <span className="text-3xl">🚀</span>
            </div>
            <DialogTitle className="text-2xl">You're earning independently!</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <p className="text-muted-foreground">
              Layer 2 complete! You have all the tools to build your practice.
            </p>
            <Button
              onClick={handleExploreLayer3}
              className="w-full gradient-primary"
            >
              Explore Layer 3: Network Expansion →
            </Button>
            <Button
              onClick={handleSkipToLayer4}
              variant="outline"
              className="w-full"
            >
              Skip to Layer 4: Corporate →
            </Button>
            <Button
              onClick={handleBackToDashboard}
              variant="ghost"
              className="w-full"
            >
              Back to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocalAwarenessPathway;
