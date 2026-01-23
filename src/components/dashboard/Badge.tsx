import { cn } from '@/lib/utils';
import { Check, Award, Star } from 'lucide-react';

interface BadgeProps {
  label: string;
  variant?: 'verified' | 'achievement' | 'special';
}

const Badge = ({ label, variant = 'verified' }: BadgeProps) => {
  const icons = {
    verified: Check,
    achievement: Award,
    special: Star,
  };

  const styles = {
    verified: 'bg-success/10 text-success border-success/20',
    achievement: 'bg-accent/10 text-accent border-accent/20',
    special: 'bg-primary/10 text-primary border-primary/20',
  };

  const Icon = icons[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border',
        styles[variant]
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
};

export default Badge;
