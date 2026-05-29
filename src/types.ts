/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RoadmapStep {
  step: number;
  title: string;
  desc: string;
}

export interface FreeCourse {
  title: string;
  provider: string;
  url: string;
  rating?: number;
  isFree: boolean;
}

export interface RecommendedTool {
  name: string;
  purpose: string;
  url?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  shortDesc: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  roadmapSteps: RoadmapStep[];
  courses: FreeCourse[];
  tools: RecommendedTool[];
  opportunities: Array<{ title: string; platform: string; earnings: string }>;
}

export interface CommunityTip {
  id: string;
  author: string;
  category: string;
  content: string;
  upvotes: number;
  timestamp: string;
}
