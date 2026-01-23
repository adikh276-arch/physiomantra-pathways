import { Calendar, Wallet, Users, Share2 } from 'lucide-react';

const stats = [
  { icon: Calendar, label: 'Sessions', value: '12', color: 'text-primary' },
  { icon: Wallet, label: 'Earnings', value: '₹4,500', color: 'text-success' },
  { icon: Users, label: 'Patients', value: '3', color: 'text-accent' },
  { icon: Share2, label: 'Referrals', value: '0', color: 'text-muted-foreground' },
];

const QuickStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
