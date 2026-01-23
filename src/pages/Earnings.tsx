import DashboardLayout from '@/components/layout/DashboardLayout';
import { Wallet, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

const earningsData = {
  thisWeek: 4500,
  thisMonth: 18750,
  pending: 1500,
  sessions: 12,
};

const recentPayments = [
  { id: 1, date: 'Jan 20', sessions: 5, amount: 1875, status: 'paid' },
  { id: 2, date: 'Jan 13', sessions: 4, amount: 1500, status: 'paid' },
  { id: 3, date: 'Jan 6', sessions: 3, amount: 1125, status: 'paid' },
];

const Earnings = () => {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Earnings</h1>
          <p className="text-muted-foreground mt-1">Track your income and payments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Wallet className="w-4 h-4" />
              <span className="text-sm">This Week</span>
            </div>
            <p className="text-2xl font-bold text-success">₹{earningsData.thisWeek.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">This Month</span>
            </div>
            <p className="text-2xl font-bold text-foreground">₹{earningsData.thisMonth.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm">Pending</span>
            </div>
            <p className="text-2xl font-bold text-warning">₹{earningsData.pending.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Sessions</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{earningsData.sessions}</p>
          </div>
        </div>

        {/* Recent Payments */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Payments</h2>
          <div className="bg-card rounded-xl shadow-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Week</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Sessions</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="border-t border-border">
                    <td className="p-4 text-foreground">{payment.date}</td>
                    <td className="p-4 text-foreground">{payment.sessions}</td>
                    <td className="p-4 font-semibold text-success">₹{payment.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Earnings;
