/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SkillCategory } from '../types';
import { Icon } from './Icon';
import { SponsorCard } from './SponsorCard';

interface CategoryDetailViewProps {
  category: SkillCategory;
  onBack: () => void;
  isSaved: boolean;
  onToggleBookmark: () => void;
  completedStepsForCategory: number[];
  onToggleStep: (stepNumber: number) => void;
  pathProgressState: 'not-started' | 'started' | 'completed';
  onToggleProgressState: () => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  onBack,
  isSaved,
  onToggleBookmark,
  completedStepsForCategory,
  onToggleStep,
  pathProgressState,
  onToggleProgressState
}) => {
  // Calculate completion percentage
  const totalSteps = category.roadmapSteps.length;
  const completedCount = completedStepsForCategory.length;
  const percentComplete = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in">
      {/* Back Button breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs md:text-sm text-slate-500 hover:text-cyan-600 font-medium transition-colors outline-none cursor-pointer"
        >
          <Icon name="ChevronLeft" size={16} />
          <span>Back to All Roads</span>
        </button>

        {/* Global Action items */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleBookmark}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              isSaved
                ? 'bg-cyan-50 text-cyan-700 border-cyan-200/80 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-xs'
            }`}
          >
            <Icon name={isSaved ? 'BookmarkCheck' : 'Bookmark'} size={14} />
            <span>{isSaved ? 'Saved to Library' : 'Save Road'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Information & Roadmap Checklist */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Description block */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 overflow-hidden relative shadow-xs">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-1.5 mb-3">
              <span className="font-mono text-[9px] px-2.5 py-1 rounded bg-cyan-50 text-cyan-700 border border-cyan-100 uppercase font-bold tracking-wider">
                {category.difficulty} Level
              </span>
              <span className="font-mono text-[9px] px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 uppercase font-bold tracking-wider">
                {category.duration} Committment
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {category.name}
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {category.description}
            </p>

            {/* Path status control toggler */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  pathProgressState === 'completed'
                    ? 'bg-emerald-500 shadow-xs'
                    : pathProgressState === 'started'
                    ? 'bg-amber-500 shadow-xs'
                    : 'bg-slate-350 shrink-0'
                }`} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Status:{' '}
                  <span className={
                    pathProgressState === 'completed'
                      ? 'text-emerald-600'
                      : pathProgressState === 'started'
                      ? 'text-amber-600'
                      : 'text-slate-500'
                  }>
                    {pathProgressState === 'completed' ? 'Mastered' : pathProgressState === 'started' ? 'In Progress' : 'Not Started'}
                  </span>
                </span>
              </div>

              <button
                onClick={onToggleProgressState}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-xs focus:outline-none cursor-pointer ${
                  pathProgressState === 'completed'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    : pathProgressState === 'started'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-cyan-600 text-white hover:bg-cyan-500'
                }`}
              >
                {pathProgressState === 'completed'
                  ? 'Reset Road Progress'
                  : pathProgressState === 'started'
                  ? 'Mark Path as Mastered!'
                  : 'Start Modern Learning'}
              </button>
            </div>
          </div>

          {/* Prominent Roadmap Banner Ad */}
          <SponsorCard zone="detail-lead" className="my-2" />

          {/* Detailed Roadmap Steps section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Interactive Roadmap</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Track your understanding by marking steps complete as you learn.
                </p>
              </div>

              {/* Completion meter */}
              {completedCount > 0 && (
                <div className="text-right">
                  <span className="font-mono text-sm text-cyan-600 font-extrabold">
                    {percentComplete}% Complete
                  </span>
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5 border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentComplete}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="relative space-y-4">
              {category.roadmapSteps.map((stepItem, idx) => {
                const isStepCompleted = completedStepsForCategory.includes(stepItem.step);
                return (
                  <div
                    key={stepItem.step}
                    onClick={() => onToggleStep(stepItem.step)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative group flex items-start gap-4 ${
                      isStepCompleted
                        ? 'bg-emerald-50/45 border-emerald-200/80 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-cyan-300'
                    }`}
                  >
                    {/* Visual left timeline vertical line */}
                    {idx < totalSteps - 1 && (
                      <div className={`absolute top-16 left-[2.3rem] bottom-[-1.5rem] w-[2px] pointer-events-none ${
                        isStepCompleted ? 'bg-emerald-200' : 'bg-slate-200'
                      }`} />
                    )}

                    {/* Step indicator circle with checkbox */}
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isStepCompleted
                          ? 'bg-emerald-500 border-transparent text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-600 group-hover:border-cyan-400 group-hover:text-cyan-600'
                      }`}>
                        {isStepCompleted ? <Icon name="Check" size={14} /> : `0${stepItem.step}`}
                      </div>
                    </div>

                    {/* Step details content */}
                    <div className="flex-grow space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-sans font-bold text-sm tracking-wide transition-colors ${
                          isStepCompleted ? 'text-slate-400 line-through' : 'text-slate-800 group-hover:text-cyan-600'
                        }`}>
                          {stepItem.title}
                        </h4>
                        <div className="text-[10px] font-mono tracking-widest text-slate-400 font-semibold uppercase group-hover:text-cyan-600 transition-colors">
                          {isStepCompleted ? 'COMPLETED' : 'MARK DONE'}
                        </div>
                      </div>
                      <p className={`text-xs leading-relaxed transition-colors ${
                        isStepCompleted ? 'text-slate-450' : 'text-slate-500'
                      }`}>
                        {stepItem.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Summary details, free courses & tools list */}
        <div className="space-y-6">
          {/* Opportunities quick earnings box */}
          {category.opportunities && category.opportunities.length > 0 && (
            <div className="p-5 rounded-3xl bg-amber-50/40 border border-amber-200 shadow-xs">
              <div className="flex items-center gap-2 text-amber-700 mb-3">
                <Icon name="TrendingUp" size={16} />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                  Freelance Opportunities
                </h3>
              </div>
              <div className="space-y-3">
                {category.opportunities.map((op, opIdx) => (
                  <div key={opIdx} className="border-b border-amber-200/50 last:border-0 pb-2.5 last:pb-0">
                    <div className="text-xs font-bold text-slate-800">{op.title}</div>
                    <div className="flex items-center justify-between text-[11px] text-amber-700 mt-1 font-mono">
                      <span>{op.platform}</span>
                      <span className="font-extrabold">{op.earnings}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Free Courses section */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Icon name="BookOpen" size={16} className="text-cyan-600" />
              <h3 className="font-sans font-bold text-sm text-slate-800">Recommended Courses</h3>
            </div>

            <div className="space-y-3">
              {category.courses.map((course, cIdx) => (
                <a
                  key={cIdx}
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 hover:border-cyan-300 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-sans font-semibold text-xs text-slate-700 group-hover:text-cyan-600 transition-colors leading-snug">
                      {course.title}
                    </h4>
                    <Icon name="ExternalLink" size={12} className="text-slate-400 flex-shrink-0 group-hover:text-cyan-600 transition-colors mt-0.5" />
                  </div>
                  <div className="flex items-center justify-between mt-2.5 text-[10px] font-mono text-slate-400">
                    <span className="text-cyan-600 font-semibold">{course.provider}</span>
                    <span className="flex items-center gap-1">
                      <Icon name="Award" size={10} className="text-amber-500" /> {course.rating || '4.8'} / 5.0
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recommended Tools section */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Icon name="Layers" size={16} className="text-cyan-600" />
              <h3 className="font-sans font-bold text-sm text-slate-800">Recommended Tools</h3>
            </div>

            <div className="space-y-2">
              {category.tools.map((tool, tIdx) => (
                <div
                  key={tIdx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-100 border border-cyan-300 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-750 flex items-center gap-1.5">
                      {tool.name}
                      {tool.url && (
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-cyan-600 transition-colors"
                          title={`Visit ${tool.name}`}
                        >
                          <Icon name="ExternalLink" size={10} />
                        </a>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                      {tool.purpose}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Promo Ad inside Details Page sidebar column */}
          <SponsorCard zone="sidebar-box" />
        </div>
      </div>
    </div>
  );
};
