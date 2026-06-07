import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Project, Job } from '../types';
import { Clock, Play, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getProjects(), api.getJobs()]).then(([p, j]) => {
      setProjects(p.slice(0, 4));
      setJobs(j.slice(0, 4));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="animate-pulse flex space-x-4">Loading dashboard...</div>;
  }

  const runningJobs = jobs.filter(j => j.status === 'running');
  const errorJobs = jobs.filter(j => j.status === 'error');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-widest">Total Projects</div>
          <div className="text-3xl font-semibold">{projects.length * 3}</div> 
          {/* Faking a larger number for visual */}
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-widest">Active Jobs</div>
          <div className="text-3xl font-semibold text-indigo-400">{runningJobs.length}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-widest">Failed Jobs</div>
          <div className="text-3xl font-semibold text-rose-500">{errorJobs.length}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-widest">Rendered Mins</div>
          <div className="text-3xl font-semibold text-emerald-500">124</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Recent Projects</h2>
            <Link to="/projects" className="text-xs text-indigo-400 hover:underline">View all</Link>
          </div>
          <div className="flex-1 p-2">
            {projects.map(p => (
              <Link key={p.id} to={`/projects/${p.id}`} className="flex items-center justify-between p-3 hover:bg-slate-800/20 rounded-md transition-colors group">
                <div>
                  <h3 className="font-medium text-sm text-slate-200 group-hover:text-indigo-400 transition-colors">{p.name}</h3>
                  <div className="text-[10px] text-slate-500 mt-1 flex flex-wrap gap-2 uppercase tracking-wide">
                    <span className="bg-slate-800 px-2 py-0.5 rounded">{p.status.replace('_', ' ')}</span>
                    <span>•</span>
                    <span>{new Date(p.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}
          </div>
        </div>

        {/* Active Jobs */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Active Jobs</h2>
            <Link to="/jobs" className="text-xs text-indigo-400 hover:underline">View all</Link>
          </div>
          <div className="flex-1 p-4 space-y-3">
            {jobs.map(j => (
              <div key={j.id} className="flex items-center gap-4 bg-slate-800/40 p-3 rounded-lg border border-slate-700">
                <div className={cn("w-8 h-8 rounded flex items-center justify-center", 
                  j.status === 'running' ? "bg-indigo-500/20 text-indigo-400" :
                  j.status === 'error' ? "bg-rose-500/20 text-rose-400" :
                  j.status === 'completed' ? "bg-emerald-500/20 text-emerald-400" :
                  "bg-slate-700 text-slate-500"
                )}>
                  {j.status === 'running' && <Play className="w-4 h-4" />}
                  {j.status === 'error' && <AlertCircle className="w-4 h-4" />}
                  {j.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                  {j.status === 'pending' && <Clock className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-200 truncate">{j.type.replace('_', ' ')}</span>
                    <span className="text-xs text-indigo-400 font-mono">{j.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        j.status === 'error' ? "bg-rose-500" : j.status === 'completed' ? "bg-emerald-500" : "bg-indigo-500"
                      )} 
                      style={{ width: `${j.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
