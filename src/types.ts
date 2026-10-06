export type TabType = 'overview' | 'development-projects' | 'economy-and-agriculture' | 'tourism-and-services';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'roads' | 'hydro' | 'health';
  categoryLabel: string;
  badge: string;
  badgeType: 'complete' | 'progress' | 'active';
  location: string;
  description: string;
  progressPercent: number;
  costLabel: string;
  costValue: string;
  agencyLabel: string;
  agency: string;
  imageUrl: string;
  imageAlt: string;
  detailedSpecs?: {
    scope: string;
    beneficiaries: string;
    targetCompletion: string;
    contractor: string;
  };
}

export interface NoticeItem {
  id: string;
  dept: string;
  time: string;
  title: string;
  summary: string;
  fullText: string;
  icon: string;
  category: 'food' | 'tourism' | 'power' | 'general';
}

export interface MandiRate {
  id: string;
  commodity: string;
  rate: string;
  unit: string;
  icon: string;
  trend: 'up' | 'stable' | 'down';
}

export interface GuideRecord {
  id: string;
  name: string;
  licenseNo: string;
  district: string;
  specialization: string;
  status: 'Active' | 'Verified' | 'Suspended';
  experienceYears: number;
}
