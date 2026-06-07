export interface Project {
  id: string;
  name: string;
  status: 'draft' | 'idea' | 'scripting' | 'generating_media' | 'assembling' | 'rendering' | 'completed' | 'error';
  createdAt: string;
  updatedAt: string;
  duration?: string;
  resolution?: string;
}

export interface PipelineStep {
  id: string;
  projectId: string;
  step: 'idea' | 'script' | 'scenes' | 'media' | 'voice' | 'subtitle' | 'timeline' | 'export';
  status: 'pending' | 'running' | 'completed' | 'error';
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

export type Scene = {
  id: string;
  projectId: string;
  order: number;
  prompt: string;
  scriptText: string;
  mediaAssetId?: string;
  voiceAudioId?: string;
  duration?: number;
};

export type AssetUsageStatus = 'own' | 'authorized' | 'public_domain' | 'creative_commons' | 'stock' | 'internal_ref' | 'unknown';

export interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  usageStatus: AssetUsageStatus;
  createdAt: string;
  projectId?: string;
}

export interface Job {
  id: string;
  targetId: string; // can be projectId or sceneId
  type: 'video_generation' | 'audio_generation' | 'render' | 'script_generation';
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

export type DiagnosticItemStatus = 'ok' | 'missing' | 'error';

export interface DiagnosticItem {
  id: string;
  name: string;
  type: 'binary' | 'service' | 'folder';
  status: DiagnosticItemStatus;
  version?: string;
  path?: string;
  message?: string;
}

export interface LocalTool {
  id: string;
  name: string;
  path: string;
  status: DiagnosticItemStatus;
}

export interface AppSettings {
  paths: {
    ffmpeg: string;
    python: string;
    node: string;
    ollama: string;
    outputFolder: string;
    assetsFolder: string;
  };
  ollamaModel: string;
}
