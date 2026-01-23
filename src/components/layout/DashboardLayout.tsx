import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

      <main className="relative z-10 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
