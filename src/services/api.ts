import { Project, Job, MediaAsset, DiagnosticItem, AppSettings, PipelineStep, Scene } from '../types';

// Mock Data
const MOCK_PROJECTS: Project[] = [
  { id: 'proj_1', name: 'Tech News Weekly', status: 'completed', createdAt: '2026-06-01T10:00:00Z', updatedAt: '2026-06-01T10:30:00Z', duration: '03:45', resolution: '1080x1920' },
  { id: 'proj_2', name: 'AI Tutorial part 1', status: 'rendering', createdAt: '2026-06-07T15:00:00Z', updatedAt: '2026-06-07T16:20:00Z', duration: '05:00', resolution: '1920x1080' },
  { id: 'proj_3', name: 'Product Promo', status: 'draft', createdAt: '2026-06-07T16:00:00Z', updatedAt: '2026-06-07T16:05:00Z' },
];

const MOCK_DIAGNOSTICS: DiagnosticItem[] = [
  { id: 'diag_1', name: 'Node.js', type: 'binary', status: 'ok', version: 'v20.10.0', path: '/usr/local/bin/node' },
  { id: 'diag_2', name: 'Python', type: 'binary', status: 'ok', version: 'Python 3.11.5', path: '/usr/bin/python3' },
  { id: 'diag_3', name: 'FFmpeg', type: 'binary', status: 'ok', version: 'ffmpeg version 6.0', path: '/usr/bin/ffmpeg' },
  { id: 'diag_4', name: 'Docker', type: 'service', status: 'ok', version: '24.0.5' },
  { id: 'diag_5', name: 'Ollama', type: 'service', status: 'ok', version: '0.1.30' },
  { id: 'diag_6', name: 'Output Folder', type: 'folder', status: 'ok', path: '/Users/local/video-ai/output' },
  { id: 'diag_7', name: 'Temp Cache', type: 'folder', status: 'missing', path: '/Users/local/video-ai/temp', message: 'Folder not found or permission denied' },
];

const MOCK_JOBS: Job[] = [
  { id: 'job_1', targetId: 'proj_2', type: 'render', status: 'running', progress: 45, createdAt: '2026-06-07T16:10:00Z', startedAt: '2026-06-07T16:11:00Z' },
  { id: 'job_2', targetId: 'scene_4', type: 'video_generation', status: 'error', progress: 10, createdAt: '2026-06-07T14:00:00Z', error: 'Ollama timeout during prompt interpretation' },
  { id: 'job_3', targetId: 'proj_1', type: 'render', status: 'completed', progress: 100, createdAt: '2026-06-01T10:15:00Z', completedAt: '2026-06-01T10:30:00Z' },
];

const MOCK_ASSETS: MediaAsset[] = [
  { id: 'ass_1', name: 'intro_bg.mp4', type: 'video', url: '/mocks/intro_bg.mp4', usageStatus: 'authorized', createdAt: '2026-05-20T00:00:00Z' },
  { id: 'ass_2', name: 'brand_logo.png', type: 'image', url: '/mocks/brand_logo.png', usageStatus: 'own', createdAt: '2026-05-21T00:00:00Z' },
  { id: 'ass_3', name: 'ambient_loop.wav', type: 'audio', url: '/mocks/ambient_loop.wav', usageStatus: 'creative_commons', createdAt: '2026-05-22T00:00:00Z' },
  { id: 'ass_4', name: 'generated_scene1.mp4', type: 'video', url: '/mocks/generated_scene1.mp4', usageStatus: 'internal_ref', createdAt: '2026-06-01T00:00:00Z', projectId: 'proj_1' },
];

const MOCK_SETTINGS: AppSettings = {
  paths: {
    ffmpeg: '/usr/bin/ffmpeg',
    python: '/usr/bin/python3',
    node: '/usr/local/bin/node',
    ollama: '/usr/local/bin/ollama',
    outputFolder: '/Users/local/video-ai/output',
    assetsFolder: '/Users/local/video-ai/assets',
  },
  ollamaModel: 'llama3:8b',
};

const MOCK_PIPELINE: PipelineStep[] = [
  { id: 'pipe_1', projectId: 'proj_2', step: 'idea', status: 'completed', completedAt: '2026-06-07T15:05:00Z' },
  { id: 'pipe_2', projectId: 'proj_2', step: 'script', status: 'completed', completedAt: '2026-06-07T15:10:00Z' },
  { id: 'pipe_3', projectId: 'proj_2', step: 'scenes', status: 'completed', completedAt: '2026-06-07T15:15:00Z' },
  { id: 'pipe_4', projectId: 'proj_2', step: 'media', status: 'completed', completedAt: '2026-06-07T16:00:00Z' },
  { id: 'pipe_5', projectId: 'proj_2', step: 'voice', status: 'completed', completedAt: '2026-06-07T16:05:00Z' },
  { id: 'pipe_6', projectId: 'proj_2', step: 'subtitle', status: 'completed', completedAt: '2026-06-07T16:08:00Z' },
  { id: 'pipe_7', projectId: 'proj_2', step: 'timeline', status: 'completed', completedAt: '2026-06-07T16:10:00Z' },
  { id: 'pipe_8', projectId: 'proj_2', step: 'export', status: 'running', startedAt: '2026-06-07T16:11:00Z' },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getDiagnostics: async (): Promise<DiagnosticItem[]> => {
    await delay(500);
    return MOCK_DIAGNOSTICS;
  },
  
  getProjects: async (): Promise<Project[]> => {
    await delay(600);
    return MOCK_PROJECTS;
  },
  
  getProject: async (id: string): Promise<{ project: Project, pipeline: PipelineStep[], scenes: Scene[] } | null> => {
    await delay(400);
    const project = MOCK_PROJECTS.find(p => p.id === id);
    if (!project) return null;
    return {
      project,
      pipeline: MOCK_PIPELINE.filter(p => p.projectId === id),
      scenes: [] // Not heavily mocking scenes for now unless needed
    };
  },
  
  createProject: async (name: string): Promise<Project> => {
    await delay(800);
    const newProj: Project = {
      id: `proj_${Date.now()}`,
      name,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    MOCK_PROJECTS.unshift(newProj);
    return newProj;
  },
  
  getJobs: async (): Promise<Job[]> => {
    await delay(300);
    return MOCK_JOBS;
  },
  
  getAssets: async (): Promise<MediaAsset[]> => {
    await delay(500);
    return MOCK_ASSETS;
  },
  
  getSettings: async (): Promise<AppSettings> => {
    await delay(400);
    return MOCK_SETTINGS;
  },
  
  updateSettings: async (settings: Partial<AppSettings>): Promise<AppSettings> => {
    await delay(700);
    Object.assign(MOCK_SETTINGS, settings);
    return MOCK_SETTINGS;
  }
};
