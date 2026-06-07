import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { DiagnosticItem } from '../types';
import { CheckCircle2, AlertCircle, HelpCircle, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

export function Diagnostics() {
  const [items, setItems] = useState<DiagnosticItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDiagnostics = () => {
    setLoading(true);
    api.getDiagnostics().then(data => {
      setItems(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">System Diagnostics</h1>
        <button 
          onClick={fetchDiagnostics}
          disabled={loading}
          className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-md text-sm transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/30 border-b border-slate-800 text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 font-medium">Component</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Version / Path</th>
              <th className="px-4 py-3 font-medium">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">Running diagnostics...</td></tr>
            ) : items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                <td className="px-4 py-3 text-slate-400 capitalize">{item.type}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    {item.status === 'ok' && <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />}
                    {item.status === 'missing' && <HelpCircle className="w-4 h-4 text-yellow-500 mr-2" />}
                    {item.status === 'error' && <AlertCircle className="w-4 h-4 text-red-500 mr-2" />}
                    <span className={cn(
                      "capitalize",
                      item.status === 'ok' ? "text-green-500" :
                      item.status === 'missing' ? "text-yellow-500" : "text-red-500"
                    )}>{item.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs font-mono text-slate-500">
                  {item.version && <div>{item.version}</div>}
                  {item.path && <div className="truncate max-w-[200px]" title={item.path}>{item.path}</div>}
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">
                  {item.message || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
