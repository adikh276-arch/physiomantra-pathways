import { cn } from '@/lib/utils';
import { Check, Lock, ChevronRight, Loader2, Star, Shield, Zap, Building, Users } from 'lucide-react';
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
  const isLocked = status === 'locked';

  // Layer icons mapping
  const LayerIcon = [Shield, Zap, Users, Building, Star][layerNumber - 1] || Star;

  const getStatusStyles = () => {
    switch (status) {
      case 'complete':
        return 'border-success/20 bg-success/5 hover:border-success/40';
      case 'in-progress':
        return 'border-primary/20 bg-white shadow-lg shadow-primary/5 ring-1 ring-primary/10';
      case 'active':
        return 'border-accent/20 bg-accent/5';
      case 'locked':
        return 'border-border/50 bg-muted/20 opacity-60 grayscale';
      default:
        return 'border-border bg-card';
    }
  };

  const progressPercentage = progress
    ? (progress.completed / progress.total) * 100
    : 0;

  return (
    <div
      className={cn(
        'group relative rounded-2xl border p-6 transition-all duration-300',
        getStatusStyles(),
        !isLocked && 'hover:-translate-y-1 hover:shadow-xl cursor-pointer',
        status === 'in-progress' && 'scale-[1.02] border-primary/40'
      )}
      onClick={!isLocked ? onClick : undefined}
    >
      <div className="flex gap-5">
        {/* Icon Box */}
        <div className={cn(
          "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm transition-colors",
          status === 'complete' ? "bg-success text-white shadow-success/20" :
            status === 'in-progress' ? "bg-primary text-white shadow-primary/30" :
              status === 'active' ? "bg-accent text-white" :
                "bg-muted text-muted-foreground"
        )}>
          {status === 'complete' ? <Check className="w-6 h-6" /> :
            status === 'locked' ? <Lock className="w-5 h-5" /> :
              <span className="font-bold">{layerNumber}</span>
          }
        </div>

        <div className="flex-1 min-w-0 py-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Pathway {layerNumber}
            </span>
            {status === 'in-progress' && (
              <span className="flex items-center text-xs font-medium text-primary animate-pulse">
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                In Progress
              </span>
            )}
          </div>

          <h3 className={cn(
            "text-lg font-bold transition-colors",
            status === 'locked' ? "text-muted-foreground" : "text-foreground group-hover:text-primary"
          )}>
            {title}
          </h3>

          {/* Progress Section */}
          {!isLocked && progress && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span className="font-medium text-foreground">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className={cn(
                "h-2 bg-muted/50",
                status === 'complete' ? "[&>div]:bg-success" : "[&>div]:bg-primary"
              )} />
              <p className="text-xs text-muted-foreground mt-1">
                {progress.completed}/{progress.total} steps completed
              </p>
            </div>
          )}

          {/* Next Step / Status messages */}
          <div className="mt-3">
            {nextStep && status === 'in-progress' && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-xs text-primary font-medium">
                Next: {nextStep}
              </div>
            )}

            {unlockCondition && isLocked && (
              <div className="text-sm text-muted-foreground bg-muted/50 inline-block px-2 py-1 rounded">
                🔒 {unlockCondition}
              </div>
            )}

            {status === 'complete' && (
              <div className="text-sm text-success font-medium flex items-center">
                All steps completed
              </div>
            )}
          </div>
        </div>

        {/* Action Arrow */}
        {!isLocked && (
          <div className="self-center hidden sm:flex">
            <Button size="icon" variant="ghost" className="rounded-full text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayerCard;
