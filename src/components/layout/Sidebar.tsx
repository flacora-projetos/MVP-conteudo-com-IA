import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, Clapperboard, Server, Images, Settings, Video } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Diagnostics', path: '/diagnostics', icon: Activity },
  { name: 'Projects', path: '/projects', icon: Clapperboard },
  { name: 'Jobs', path: '/jobs', icon: Server },
  { name: 'Library', path: '/library', icon: Images },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 h-full flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
          <Video className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold tracking-tight text-white uppercase">AIVideo Studio</span>
      </div>
      
      <nav className="flex-1 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-6 py-2 text-sm transition-colors gap-3",
                isActive 
                  ? "bg-slate-800 text-white font-medium border-r-2 border-indigo-500" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Local Engine</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
          <div className="text-xs flex justify-between">
            <span className="text-slate-400">Status</span>
            <span className="text-emerald-400">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
