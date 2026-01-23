import DashboardLayout from '@/components/layout/DashboardLayout';
import { Users, Calendar, Trophy, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const upcomingEvents = [
  { id: 1, title: 'AMA with Founders', date: 'Jan 30', time: '7:00 PM' },
  { id: 2, title: 'Corporate Sales Workshop', date: 'Feb 5', time: '6:00 PM' },
];

const Community = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Community</h1>
          <p className="text-muted-foreground mt-1">Connect, learn, and grow with fellow providers</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card text-center">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">500+</p>
            <p className="text-sm text-muted-foreground">Providers</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card text-center">
            <Calendar className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">2</p>
            <p className="text-sm text-muted-foreground">Upcoming Events</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card text-center">
            <Trophy className="w-6 h-6 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">Top 50</p>
            <p className="text-sm text-muted-foreground">Your Rank</p>
          </div>
        </div>

        {/* Community Channels */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Community Channels</h2>
          <div className="flex items-center gap-4 p-4 rounded-xl border border-success/30 bg-success/5">
            <div className="p-2 rounded-lg bg-success/20">
              <MessageCircle className="w-5 h-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">WhatsApp Community</p>
              <p className="text-sm text-muted-foreground">500+ providers active</p>
            </div>
            <Button variant="outline" size="sm">Joined</Button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
              </div>
              <Button size="sm">Register</Button>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Explore</h2>
          <div
            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors"
            onClick={() => navigate('/layer5/training')}
          >
            <span className="text-2xl">📚</span>
            <div className="flex-1">
              <p className="font-medium text-foreground">Training Library</p>
              <p className="text-sm text-muted-foreground">On-demand videos and webinars</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
          <div
            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors"
            onClick={() => navigate('/layer5/recognition')}
          >
            <span className="text-2xl">🏆</span>
            <div className="flex-1">
              <p className="font-medium text-foreground">Leaderboard</p>
              <p className="text-sm text-muted-foreground">Top earners and city champions</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Community;
