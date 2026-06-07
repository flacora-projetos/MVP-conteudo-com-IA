import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Project } from '../types';
import { Plus, Search, Clapperboard, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const handleCreate = async () => {
    const name = prompt("Project Name:", "New Project");
    if (name) {
      const newProj = await api.createProject(name);
      navigate(`/projects/${newProj.id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <button 
          onClick={handleCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-md pl-9 pr-4 py-1.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading projects...</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/30 border-b border-slate-800 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Duration</th>
                <th className="px-4 py-3 font-medium">Updated At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/20 transition-colors cursor-pointer" onClick={() => navigate(`/projects/${p.id}`)}>
                  <td className="px-4 py-3 font-medium text-white flex items-center">
                    <Clapperboard className="w-4 h-4 text-slate-400 mr-3" />
                    {p.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-slate-800 text-xs font-medium rounded capitalize text-slate-300">
                      {p.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1.5" />
                      {p.duration || '--:--'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {new Date(p.updatedAt).toLocaleString()}
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
