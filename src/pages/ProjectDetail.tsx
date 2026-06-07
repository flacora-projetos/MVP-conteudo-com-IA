import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Project, PipelineStep } from '../types';
import { ArrowLeft, Play, Settings, Image as ImageIcon, FileText, CheckCircle2, Circle, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const PIPELINE_ORDER = ['idea', 'script', 'scenes', 'media', 'voice', 'subtitle', 'timeline', 'export'];

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{ project: Project, pipeline: PipelineStep[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.getProject(id).then(res => {
        setData(res);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="animate-pulse">Loading project details...</div>;
  if (!data) return <div>Project not found.</div>;

  const { project, pipeline } = data;

  const getStepStatus = (stepName: string) => {
    const step = pipeline.find(p => p.step === stepName);
    return step ? step.status : 'pending';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/projects" className="p-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-md transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-400 hover:text-white" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
          <div className="text-sm text-slate-400 flex items-center space-x-2 mt-1">
            <span className="uppercase tracking-wider text-xs font-mono">{project.id}</span>
            <span>•</span>
            <span className="capitalize">{project.status.replace('_', ' ')}</span>
            <span>•</span>
            <span>{project.resolution || 'Auto'}</span>
          </div>
        </div>
        <div className="flex-1"></div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-medium transition-colors">
          <Play className="w-4 h-4" />
          <span>Run Pipeline</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pipeline Map */}
        <div className="lg:col-span-1 border border-slate-800 bg-slate-900 rounded-xl p-4 flex flex-col">
          <h2 className="font-semibold text-sm uppercase tracking-widest text-slate-500 mb-4">Pipeline Execution</h2>
          <div className="flex-1 space-y-0 text-sm">
            {PIPELINE_ORDER.map((step, idx) => {
              const status = getStepStatus(step);
              return (
                <div key={step} className="flex grid grid-cols-[1fr_24px_1fr] relative">
                  {/* Left spacer for alignment if needed, but let's just do a clean line */}
                  <div className="col-span-3 flex items-start space-x-3 pb-6 relative">
                    {idx < PIPELINE_ORDER.length - 1 && (
                      <div className="absolute left-2 top-6 bottom-0 w-px bg-slate-800"></div>
                    )}
                    <div className="relative z-10 bg-slate-900 py-1">
                      {status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {status === 'running' && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
                      {status === 'pending' && <Circle className="w-4 h-4 text-slate-700" />}
                      {status === 'error' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                    </div>
                    <div className="pt-0.5">
                      <div className={cn(
                        "font-medium capitalize",
                        status === 'running' ? "text-indigo-400" : 
                        status === 'completed' ? "text-slate-300" : "text-slate-500"
                      )}>
                        {step}
                      </div>
                      {status === 'running' && <div className="text-xs text-slate-400 mt-0.5">Processing...</div>}
                      {status === 'error' && <div className="text-xs text-rose-400 mt-0.5">Failed to process step</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workspace Area - Mocked Tabs */}
        <div className="lg:col-span-2 border border-slate-800 bg-slate-900 rounded-xl flex flex-col h-[600px]">
          <div className="border-b border-slate-800 flex">
            <button className="px-4 py-3 text-sm font-medium border-b-2 border-indigo-500 text-white">Script Editor</button>
            <button className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-white">Media Assets</button>
            <button className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-white">Timeline Preview</button>
          </div>
          
          <div className="flex-1 p-4 bg-slate-950 m-2 rounded border border-slate-800 overflow-y-auto">
            <div className="flex items-center space-x-2 text-slate-400 mb-4">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Prompt -&gt; Script</span>
            </div>
            <textarea 
              className="w-full h-full min-h-[300px] bg-transparent resize-none outline-none text-sm text-gray-300 font-mono leading-relaxed p-2"
              defaultValue={`[SCENE 1]
Prompt: "A futuristic cityscape at sunset"
Voiceover: "In the year 2050, technology has reshaped the skyline..."
Duration: 5s

[SCENE 2]
Prompt: "Close up of a neon glowing microchip"
Voiceover: "At the heart of the revolution lies the Quantum Core."
Duration: 4s`}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}
