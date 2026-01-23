import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Wallet, 
  Building2, 
  Users, 
  User,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Sessions', path: '/sessions' },
  { icon: Wallet, label: 'Earnings', path: '/earnings' },
  { icon: Building2, label: 'Corporate', path: '/corporate' },
  { icon: Users, label: 'Community', path: '/community' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 gradient-sidebar min-h-screen p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 py-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
          <span className="text-sidebar-primary-foreground font-bold text-lg">PM</span>
        </div>
        <div>
          <h1 className="text-sidebar-foreground font-bold text-lg">PhysioMantra</h1>
          <p className="text-sidebar-foreground/60 text-xs">Provider Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive && 'text-sidebar-primary')} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto text-sidebar-primary" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border pt-4 mt-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sidebar-foreground font-medium">AS</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sidebar-foreground font-medium text-sm truncate">Dr. Anika Sharma</p>
            <p className="text-sidebar-foreground/60 text-xs truncate">Bangalore</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors">
            <LogOut className="w-4 h-4 text-sidebar-foreground/60" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
