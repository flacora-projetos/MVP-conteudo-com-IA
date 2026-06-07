import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Job } from '../types';
import { Play, AlertCircle, CheckCircle2, Clock, Trash2, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = () => {
    setLoading(true);
    api.getJobs().then(data => {
      setJobs(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Job Queue</h1>
        <button 
          onClick={fetchJobs}
          className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-md text-sm transition-colors"
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading job queue...</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/30 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Job Type</th>
                <th className="px-4 py-3 font-medium">Target ID</th>
                <th className="px-4 py-3 font-medium w-1/3">Progress</th>
                <th className="px-4 py-3 font-medium">Started At</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {jobs.map((j) => (
                <tr key={j.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {j.status === 'running' && <Play className="w-4 h-4 text-indigo-400 mr-2" />}
                      {j.status === 'error' && <AlertCircle className="w-4 h-4 text-rose-500 mr-2" />}
                      {j.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />}
                      {j.status === 'pending' && <Clock className="w-4 h-4 text-amber-500 mr-2" />}
                      <span className="capitalize">{j.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs uppercase text-slate-300">
                    {j.type}
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-400">
                    {j.targetId.includes('proj') ? (
                      <Link to={`/projects/${j.targetId}`} className="hover:text-indigo-400 hover:underline">{j.targetId}</Link>
                    ) : (
                      j.targetId
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {j.status === 'error' ? (
                      <div className="text-xs text-rose-400 truncate max-w-xs" title={j.error}>{j.error}</div>
                    ) : (
                      <div className="flex items-center w-full max-w-[200px]">
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mr-3">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              j.status === 'completed' ? "bg-emerald-500" : "bg-indigo-500"
                            )} 
                            style={{ width: `${j.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-mono">{j.progress}%</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {j.startedAt ? new Date(j.startedAt).toLocaleTimeString() : '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
