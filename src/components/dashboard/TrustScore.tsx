import { cn } from '@/lib/utils';

interface TrustScoreProps {
  score: number;
  maxScore?: number;
}

const TrustScore = ({ score, maxScore = 100 }: TrustScoreProps) => {
  const percentage = (score / maxScore) * 100;
  const filledDots = Math.round((score / maxScore) * 10);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">Trust Score:</span>
      <div className="flex items-center gap-1">
        <span className="font-bold text-foreground">{score}</span>
        <span className="text-muted-foreground">/{maxScore}</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-2 h-2 rounded-full transition-colors',
              i < filledDots ? 'bg-primary' : 'bg-muted'
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default TrustScore;
