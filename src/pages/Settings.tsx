import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { AppSettings } from '../types';
import { Save, Folder, Terminal, Box } from 'lucide-react';
import { cn } from '../lib/utils';

export function Settings() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getSettings().then(setSettings);
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    await api.updateSettings(settings);
    setSaving(false);
  };

  const updatePath = (key: keyof AppSettings['paths'], value: string) => {
    if (!settings) return;
    setSettings({ ...settings, paths: { ...settings.paths, [key]: value } });
  };

  if (!settings) return <div className="animate-pulse">Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Configuration</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-md text-sm font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Tool Paths */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Terminal className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-semibold">Local Tool Paths</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-[150px_1fr] items-center gap-4">
              <label className="text-sm text-slate-400 font-medium text-right">FFmpeg</label>
              <input 
                type="text" 
                value={settings.paths.ffmpeg}
                onChange={(e) => updatePath('ffmpeg', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-4">
              <label className="text-sm text-slate-400 font-medium text-right">Python</label>
              <input 
                type="text" 
                value={settings.paths.python}
                onChange={(e) => updatePath('python', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-4">
              <label className="text-sm text-slate-400 font-medium text-right">Node.js</label>
              <input 
                type="text" 
                value={settings.paths.node}
                onChange={(e) => updatePath('node', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-4">
              <label className="text-sm text-slate-400 font-medium text-right">Ollama</label>
              <input 
                type="text" 
                value={settings.paths.ollama}
                onChange={(e) => updatePath('ollama', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </section>

        {/* Workspace Folders */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Folder className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-semibold">Workspace Folders</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-[150px_1fr] items-center gap-4">
              <label className="text-sm text-slate-400 font-medium text-right">Output Folder</label>
              <input 
                type="text" 
                value={settings.paths.outputFolder}
                onChange={(e) => updatePath('outputFolder', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-4">
              <label className="text-sm text-slate-400 font-medium text-right">Assets Folder</label>
              <input 
                type="text" 
                value={settings.paths.assetsFolder}
                onChange={(e) => updatePath('assetsFolder', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </section>

        {/* AI Models */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Box className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-semibold">AI Models (Local)</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-[150px_1fr] items-center gap-4">
              <label className="text-sm text-slate-400 font-medium text-right">Ollama Model</label>
              <select 
                value={settings.ollamaModel}
                onChange={(e) => setSettings({ ...settings, ollamaModel: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="llama3:8b">llama3:8b</option>
                <option value="mistral:latest">mistral:latest</option>
                <option value="phi3:mini">phi3:mini</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
