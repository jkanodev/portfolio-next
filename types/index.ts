export type Project = {
  id: string;
  title: string;
  stack: string[];
  one_liner: string;
  architecture?: string[];
  workflow_commands?: string[];
  linked_errors?: string[];
  prevention_checklist?: string[];
  /** Extended fields for featured projects (e.g. Landing Zone) */
  subtitle?: string;
  tags?: string[];
  href?: string;
  status?: string;
  highlights?: string[];
  proof?: string[];
  repoLink?: string;
  note?: string;
  goal?: string;
  exercises?: string[];
  cloudMapping?: { aws: string; azure: string }[];
};

export type LearningProfile = {
  name: string;
  roleTargets: string[];
  location: string;
  links: { github: string };
};

export type WellArchitectedPillar = {
  name: string;
  whatItMeans: string[];
  howIApplyIt: string[];
};

export type LearningData = {
  profile: LearningProfile;
  highlights: string[];
  aws: {
    summary: string[];
    handsOn: string[];
    /** Well-Architected Framework: 6 pillars (Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability) */
    wellArchitectedPillars: WellArchitectedPillar[];
  };
  kubernetes: {
    status: { section0: string; section1: string; section2: string; current: string };
    keyLearnings: string[];
    nextUp: string[];
  };
  selfHostingAndDevOps: {
    stack: string[];
    whatILearned: string[];
    lessonsLearned: string[];
  };
  proof: Array<{ title: string; result: string; howToVerify: string[] }>;
};
