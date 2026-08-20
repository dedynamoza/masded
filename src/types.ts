export type PhaseId = 1 | 2 | 3;

export type LocationCategory = 'notaris' | 'finance' | 'bpn' | 'oss' | 'internal' | 'field';

export interface MilestoneItem {
  id: number;
  phaseId: PhaseId;
  stepNumber: number;
  title: string;
  shortDesc: string;
  location: string;
  locationCategory: LocationCategory;
  estimatedTime: string;
  pic: string;
  detailedExplanation: string;
  inputs: string[];
  outputs: string[];
  regulatoryNotes?: string;
  isCritical?: boolean;
  tips?: string;
  // Visual styling to match serpentine roadmap
  nodeColor: string;
  nodeColorHex: string;
  cardBg: string;
  cardBorder: string;
  tagBg: string;
  tagText: string;
}

export interface PhaseGroup {
  id: PhaseId;
  title: string;
  subtitle: string;
  badge: string;
  color: {
    badgeBg: string;
    badgeText: string;
    border: string;
    lightBg: string;
    accent: string;
    glow: string;
  };
  milestoneIds: number[];
}

export type ViewMode = 'graph' | 'stepper' | 'swimlane' | 'checklist';
