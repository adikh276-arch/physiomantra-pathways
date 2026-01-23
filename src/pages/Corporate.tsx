import DashboardLayout from '@/components/layout/DashboardLayout';
import { Building2, Users, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/contexts/ProgressContext';

const Corporate = () => {
  const navigate = useNavigate();
  const { isLayerUnlocked, isLayerComplete, progress } = useProgress();

  const corporateUnlocked = isLayerUnlocked('layer4');

  if (!corporateUnlocked) {
    return (
      <DashboardLayout>
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Corporate Portal Locked</h1>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Complete Layer 2 to unlock corporate partnerships and start earning ₹15,000-25,000/month per account.
            </p>
            <Button onClick={() => navigate('/')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Corporate Portal</h1>
          <p className="text-muted-foreground mt-1">Manage corporate partnerships and leads</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card text-center">
            <Building2 className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Active Accounts</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card text-center">
            <Users className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Leads Submitted</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card text-center">
            <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">₹0</p>
            <p className="text-sm text-muted-foreground">Corporate Earnings</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          <div
            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors"
            onClick={() => navigate('/layer4/share-leads')}
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Submit a Corporate Lead</p>
              <p className="text-sm text-muted-foreground">Know a company that needs physiotherapy services?</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
          <div
            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors"
            onClick={() => navigate('/layer4/corporate-readiness')}
          >
            <div className="p-2 rounded-lg bg-accent/10">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Download Corporate Kit</p>
              <p className="text-sm text-muted-foreground">Get pitch decks, letters, and templates</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Corporate;
