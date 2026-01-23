import { cn } from '@/lib/utils';
import { Check, Lock, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface LayerCardProps {
  layerNumber: number;
  title: string;
  status: 'complete' | 'in-progress' | 'locked' | 'active';
  progress?: { completed: number; total: number };
  nextStep?: string;
  unlockCondition?: string;
  onClick?: () => void;
}

const LayerCard = ({
  layerNumber,
  title,
  status,
  progress,
  nextStep,
  unlockCondition,
  onClick,
}: LayerCardProps) => {
  const statusStyles = {
    complete: 'border-success/30 bg-success/5',
    'in-progress': 'border-primary/30 bg-primary/5',
    locked: 'border-locked/30 bg-locked/5 opacity-75',
    active: 'border-accent/30 bg-accent/5',
  };

  const statusIcons = {
    complete: <Check className="w-5 h-5 text-success" />,
    'in-progress': <Loader2 className="w-5 h-5 text-primary animate-spin" />,
    locked: <Lock className="w-5 h-5 text-locked" />,
    active: <span className="text-accent text-lg">⭐</span>,
  };

  const progressPercentage = progress
    ? (progress.completed / progress.total) * 100
    : 0;

  return (
    <div
      className={cn(
        'rounded-xl border-2 p-4 transition-all duration-200',
        statusStyles[status],
        status !== 'locked' && 'hover:shadow-card cursor-pointer'
      )}
      onClick={status !== 'locked' ? onClick : undefined}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">{statusIcons[status]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Layer {layerNumber}:
            </span>
            <span className="font-semibold text-foreground">{title}</span>
            {status === 'complete' && (
              <span className="text-xs text-success font-medium">(COMPLETE)</span>
            )}
            {status === 'in-progress' && (
              <span className="text-xs text-primary font-medium">(IN PROGRESS)</span>
            )}
          </div>

          {progress && status !== 'locked' && (
            <div className="mt-2 space-y-1">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {progress.completed}/{progress.total} pathways completed
              </p>
            </div>
          )}

          {nextStep && status === 'in-progress' && (
            <p className="mt-2 text-sm text-muted-foreground">
              Next: <span className="text-foreground">{nextStep}</span>
            </p>
          )}

          {unlockCondition && status === 'locked' && (
            <p className="mt-1 text-sm text-locked-foreground">
              Unlock by: {unlockCondition}
            </p>
          )}

          {status !== 'locked' && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
            >
              {status === 'complete' ? 'Review' : 'Continue'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LayerCard;
