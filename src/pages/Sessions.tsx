import DashboardLayout from '@/components/layout/DashboardLayout';
import { Calendar, Clock, User, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sessions = [
  {
    id: 1,
    patient: 'Rajesh Kumar',
    condition: 'Lower Back Pain',
    date: 'Today',
    time: '2:00 PM',
    type: 'Video',
    status: 'upcoming',
  },
  {
    id: 2,
    patient: 'Priya Nair',
    condition: 'Shoulder Injury',
    date: 'Today',
    time: '4:30 PM',
    type: 'Video',
    status: 'upcoming',
  },
  {
    id: 3,
    patient: 'Amit Shah',
    condition: 'Knee Rehabilitation',
    date: 'Yesterday',
    time: '11:00 AM',
    type: 'Video',
    status: 'completed',
  },
];

const Sessions = () => {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Sessions</h1>
          <p className="text-muted-foreground mt-1">Manage your upcoming and past sessions</p>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`bg-card rounded-xl p-4 shadow-card border ${
                session.status === 'upcoming' ? 'border-primary/30' : 'border-border'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{session.patient}</p>
                    <p className="text-sm text-muted-foreground">{session.condition}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {session.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {session.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    {session.type}
                  </div>
                </div>
                <Button
                  variant={session.status === 'upcoming' ? 'default' : 'outline'}
                  size="sm"
                >
                  {session.status === 'upcoming' ? 'Join Session' : 'View Summary'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sessions;
