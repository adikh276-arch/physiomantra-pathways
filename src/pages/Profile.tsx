import DashboardLayout from '@/components/layout/DashboardLayout';
import { User, Mail, Phone, MapPin, Award, Star } from 'lucide-react';
import Badge from '@/components/dashboard/Badge';
import TrustScore from '@/components/dashboard/TrustScore';
import { useProgress } from '@/contexts/ProgressContext';

const Profile = () => {
  const { progress, isLayerComplete } = useProgress();

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">Your professional profile on PhysioMantra</p>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-3xl font-bold">
              AS
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Dr. {progress.userName}</h2>
                <p className="text-muted-foreground">MPT - Orthopedic Physiotherapy</p>
              </div>
              <TrustScore score={75} />
              <div className="flex flex-wrap gap-2">
                {isLayerComplete('layer1') && <Badge label="Verified Physio" variant="verified" />}
                {isLayerComplete('layer1') && <Badge label="Foundation Master" variant="achievement" />}
                {isLayerComplete('layer2') && <Badge label="Patient Builder" variant="special" />}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-5 h-5" />
              <span>anika.sharma@email.com</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-5 h-5" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span>Bangalore, Karnataka</span>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Specializations</h3>
          <div className="flex flex-wrap gap-2">
            {['Orthopedic', 'Sports', 'Pain Management', 'Manual Therapy'].map((spec) => (
              <span
                key={spec}
                className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Platform Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Active Patients</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">4.8</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">₹4,500</p>
              <p className="text-sm text-muted-foreground">Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
