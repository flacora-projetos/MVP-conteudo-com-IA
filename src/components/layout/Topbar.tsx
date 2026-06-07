import { Bell, Search } from 'lucide-react';

export function Topbar() {
  return (
    <header className="h-16 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects, jobs..." 
            className="w-full bg-slate-900 border border-slate-800 rounded-md pl-9 pr-4 py-1.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-slate-400 hover:text-white relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold">
          AI
        </div>
      </div>
    </header>
  );
}
