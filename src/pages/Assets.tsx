import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { MediaAsset } from '../types';
import { Image as ImageIcon, Video, Music, Shield, Search, Upload } from 'lucide-react';
import { cn } from '../lib/utils';

export function Assets() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAssets().then(data => {
      setAssets(data);
      setLoading(false);
    });
  }, []);

  const getUsageColor = (status: string) => {
    switch(status) {
      case 'own': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'public_domain': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'creative_commons': return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20';
      case 'stock': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'authorized': return 'text-teal-400 bg-teal-400/10 border-teal-400/20';
      case 'internal_ref': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      default: return <ImageIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-sm font-medium transition-colors border border-slate-700">
          <Upload className="w-4 h-4" />
          <span>Import Asset</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-md pl-9 pr-4 py-1.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading assets...</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/30 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-4 py-3 font-medium">Asset Name</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Usage Rights</th>
                <th className="px-4 py-3 font-medium">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {assets.map((a) => (
                <tr key={a.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-4 py-3 font-medium text-white flex items-center">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center mr-3 text-slate-400">
                      {getIcon(a.type)}
                    </div>
                    {a.name}
                  </td>
                  <td className="px-4 py-3 text-slate-400 capitalize">
                    {a.type}
                  </td>
                  <td className="px-4 py-3">
                    <div className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs border font-medium", getUsageColor(a.usageStatus))}>
                      <Shield className="w-3 h-3 mr-1.5" />
                      {a.usageStatus.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {new Date(a.createdAt).toLocaleDateString()}
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
