import { useNavigate } from 'react-router-dom';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { Button } from '@/components/ui/button';
import { MessageCircle, Hash } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';

const CommunityPathway = () => {
  const { completePathway } = useProgress();
  const navigate = useNavigate();

  const handleJoinWhatsApp = () => {
    toast.success('Added to WhatsApp group!');
    completePathway('layer5', 'community');
  };

  const handleJoinSlack = () => {
    toast.success('Slack invite sent!');
  };

  const handleContinue = () => {
    completePathway('layer5', 'community');
    navigate('/layer5/training');
  };

  return (
    <PathwayLayout
      title="Provider Community"
      layerNumber={5}
      pathwayNumber={1}
      onComplete={handleContinue}
      completeButtonText="Continue"
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Connect with fellow PhysioMantra providers for support, tips, and growth.
        </p>

        <h3 className="font-semibold text-foreground">Community Channels:</h3>

        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-success/30 bg-success/5">
            <div className="p-2 rounded-lg bg-success/20">
              <MessageCircle className="w-5 h-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">WhatsApp Community</p>
              <p className="text-sm text-muted-foreground">Auto-added for all providers</p>
            </div>
            <Button onClick={handleJoinWhatsApp} variant="outline" size="sm">
              Join
            </Button>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
            <div className="p-2 rounded-lg bg-muted">
              <Hash className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Slack Workspace</p>
              <p className="text-sm text-muted-foreground">Optional - for advanced discussions</p>
            </div>
            <Button onClick={handleJoinSlack} variant="outline" size="sm">
              Join
            </Button>
          </div>
        </div>
      </div>
    </PathwayLayout>
  );
};

export default CommunityPathway;
